import { env } from '../config/env.js';
import { cacheGet, cacheSet } from '../utils/cache.js';
import { ApiError } from '../utils/apiError.js';
import type {
  AniListGenresPayload,
  AniListHomePayload,
  AniListMediaPayload,
  AniListPagePayload,
  AniListResponse,
} from '../types/anilist.js';

/**
 * AniList GraphQL client.
 *
 * AniList's public GraphQL endpoint needs no API key. We keep a small request
 * queue + TTL cache so a page load never bursts past the rate limit, and a
 * circuit breaker so the UI can fall back to the bundled catalogue quickly.
 */

const MIN_INTERVAL_MS = 800; // small gap between requests; the real cap is per minute
const PER_MINUTE_LIMIT = 25;
const WINDOW_MS = 60 * 1000;
const DEFAULT_TTL = 5 * 60 * 1000;
const REQUEST_TIMEOUT_MS = 12000;
const MAX_ATTEMPTS = 2;
const CIRCUIT_MS = 2 * 60 * 1000;

type Variables = Record<string, unknown>;

let lastRequestAt = 0;
let queue: Promise<void> = Promise.resolve();
const requestTimes: number[] = [];
let circuitOpenUntil = 0;
const pending = new Map<string, Promise<unknown>>();

const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

/** Serialises outgoing requests and enforces the rolling rate limit. */
function schedule<T>(task: () => Promise<T>): Promise<T> {
  const run = queue.then(async () => {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const now = Date.now();
      while (requestTimes.length && requestTimes[0] < now - WINDOW_MS) requestTimes.shift();

      if (requestTimes.length < PER_MINUTE_LIMIT) break;
      await sleep(Math.max(requestTimes[0] + WINDOW_MS - now + 50, 250));
    }

    const waitMs = Math.max(0, MIN_INTERVAL_MS - (Date.now() - lastRequestAt));
    if (waitMs > 0) await sleep(waitMs);

    lastRequestAt = Date.now();
    requestTimes.push(lastRequestAt);
    return task();
  });

  // Keep the chain alive even if a request fails
  queue = run.then(
    () => undefined,
    () => undefined
  );
  return run;
}

function assertCircuitClosed(): void {
  if (Date.now() < circuitOpenUntil) {
    throw new ApiError(503, 'Anime metadata service is temporarily unavailable');
  }
}

function noteFailure(): void {
  circuitOpenUntil = Date.now() + CIRCUIT_MS;
}

function noteSuccess(): void {
  circuitOpenUntil = 0;
}

function hashKey(value: string): string {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return Math.abs(hash).toString(36);
}

async function graphql<T>(query: string, variables: Variables = {}, ttl = DEFAULT_TTL): Promise<T> {
  const cacheKey = `anilist:${hashKey(`${query}|${JSON.stringify(variables)}`)}`;
  const cached = cacheGet<T>(cacheKey);
  if (cached) return cached;

  // Share one network request when details/episodes/characters load together.
  if (pending.has(cacheKey)) return pending.get(cacheKey) as Promise<T>;

  assertCircuitClosed();

  const request = schedule(async () => {
    // Another queued request may have failed while this one was waiting.
    assertCircuitClosed();

    let lastError: unknown = null;

    for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt += 1) {
      try {
        const response = await fetch(env.anilistApiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'User-Agent': 'SayonaraAnime/1.0',
          },
          body: JSON.stringify({ query, variables }),
          signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
        });

        if (response.status === 429 || response.status >= 500) {
          throw new ApiError(502, `AniList responded with status ${response.status}`, {
            retryable: true,
          });
        }

        if (!response.ok) {
          throw new ApiError(502, `AniList responded with status ${response.status}`);
        }

        const json = (await response.json()) as AniListResponse<T>;
        if (json.errors?.length) {
          const message = json.errors.map((error) => error.message).join('; ');
          throw new ApiError(502, `AniList error: ${message}`);
        }

        if (!json.data) {
          throw new ApiError(502, 'AniList returned an empty response');
        }

        noteSuccess();
        return cacheSet<T>(cacheKey, json.data, ttl);
      } catch (error) {
        lastError = error;

        // Only retry when the server answered but asked us to slow down.
        const details =
          error instanceof ApiError ? (error.details as { retryable?: boolean } | null) : null;
        const retryable = Boolean(details?.retryable);
        if (!retryable || attempt >= MAX_ATTEMPTS - 1) break;

        await sleep(error instanceof ApiError && error.statusCode === 429 ? 3000 : 1500);
      }
    }

    noteFailure();
    throw new ApiError(
      502,
      'The anime metadata service is unavailable right now. Please try again shortly.',
      lastError instanceof Error ? lastError.message : null
    );
  });

  pending.set(cacheKey, request);
  request
    .finally(() => {
      if (pending.get(cacheKey) === request) pending.delete(cacheKey);
    })
    .catch(() => {});

  return request;
}

/** Shared field selection used by every list/detail query. */
const MEDIA_FIELDS = `
  fragment MediaFields on Media {
    id
    idMal
    title { romaji english native }
    description
    format
    status
    episodes
    duration
    season
    seasonYear
    startDate { year month day }
    endDate { year month day }
    nextAiringEpisode { episode airingAt }
    averageScore
    meanScore
    popularity
    favourites
    genres
    source
    isAdult
    coverImage { extraLarge large medium color }
    bannerImage
    trailer { id site thumbnail }
    siteUrl
    externalLinks { site url type }
    studios(isMain: true) { nodes { name } }
  }
`;

const HOME_QUERY = `
  query Home($season: MediaSeason, $seasonYear: Int) {
    trending: Page(page: 1, perPage: 12) {
      media(type: ANIME, sort: TRENDING_DESC, isAdult: false) { ...MediaFields }
    }
    currentSeason: Page(page: 1, perPage: 12) {
      media(type: ANIME, season: $season, seasonYear: $seasonYear, sort: POPULARITY_DESC, isAdult: false) {
        ...MediaFields
      }
    }
    topRated: Page(page: 1, perPage: 12) {
      media(type: ANIME, sort: [SCORE_DESC, POPULARITY_DESC], isAdult: false) { ...MediaFields }
    }
    upcoming: Page(page: 1, perPage: 12) {
      media(type: ANIME, status: NOT_YET_RELEASED, sort: POPULARITY_DESC, isAdult: false) {
        ...MediaFields
      }
    }
    genres: GenreCollection
  }
  ${MEDIA_FIELDS}
`;

const SEARCH_QUERY = `
  query Search(
    $page: Int
    $perPage: Int
    $search: String
    $genres: [String]
    $seasonYear: Int
    $season: MediaSeason
    $format: MediaFormat
    $status: MediaStatus
    $sort: [MediaSort]
    $minScore: Int
    $maxScore: Int
  ) {
    Page(page: $page, perPage: $perPage) {
      pageInfo { total currentPage lastPage hasNextPage perPage }
      media(
        type: ANIME
        search: $search
        genre_in: $genres
        seasonYear: $seasonYear
        season: $season
        format: $format
        status: $status
        sort: $sort
        averageScore_greater: $minScore
        averageScore_lesser: $maxScore
        isAdult: false
      ) {
        ...MediaFields
      }
    }
  }
  ${MEDIA_FIELDS}
`;

const MEDIA_QUERY = `
  query Media($id: Int) {
    Media(id: $id, type: ANIME) {
      ...MediaFields
      characters(sort: [ROLE, RELEVANCE], perPage: 12) {
        edges {
          role
          voiceActors(language: JAPANESE) { name { full } }
          node { id name { full } image { large } }
        }
      }
      recommendations(perPage: 12, sort: RATING_DESC) {
        nodes {
          mediaRecommendation {
            id
            title { romaji english }
            coverImage { large extraLarge }
          }
        }
      }
    }
  }
  ${MEDIA_FIELDS}
`;

const GENRES_QUERY = `
  query Genres {
    GenreCollection
  }
`;

const POPULAR_PAGE_QUERY = `
  query PopularPage($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      media(type: ANIME, sort: POPULARITY_DESC, isAdult: false) { ...MediaFields }
    }
  }
  ${MEDIA_FIELDS}
`;

/** Current anime season in AniList's enum format. */
export function currentSeason(date = new Date()): { season: string; seasonYear: number } {
  const month = date.getMonth();
  const seasons = ['WINTER', 'SPRING', 'SUMMER', 'FALL'];
  return {
    season: seasons[Math.floor(month / 3)] ?? 'WINTER',
    seasonYear: date.getFullYear(),
  };
}

export const anilist = {
  home: (ttl = DEFAULT_TTL) => graphql<AniListHomePayload>(HOME_QUERY, currentSeason(), ttl),
  search: (variables: Variables, ttl = DEFAULT_TTL) =>
    graphql<AniListPagePayload>(SEARCH_QUERY, variables, ttl),
  media: (id: number, ttl = DEFAULT_TTL) =>
    graphql<AniListMediaPayload>(MEDIA_QUERY, { id: Number(id) }, ttl),
  genres: (ttl = DEFAULT_TTL) => graphql<AniListGenresPayload>(GENRES_QUERY, {}, ttl),
  popularPage: (page: number, perPage = 10, ttl = 60 * 1000) =>
    graphql<AniListPagePayload>(POPULAR_PAGE_QUERY, { page, perPage }, ttl),
};

export const CACHE_TTL = {
  detail: 10 * 60 * 1000,
  list: 5 * 60 * 1000,
  search: 3 * 60 * 1000,
  static: 24 * 60 * 60 * 1000,
};
