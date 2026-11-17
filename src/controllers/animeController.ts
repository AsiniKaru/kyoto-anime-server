import type { Request } from 'express';
import { anilist, CACHE_TTL } from '../services/anilistService.js';
import { mapAnime, mapAnimeList, mapPagination } from '../services/animeMapperService.js';
import { genreName, mapGenre } from '../services/anilistGenresService.js';
import { resolveTrailer } from '../services/youtubeService.js';
import {
  fallbackAnime,
  fallbackAnimeById,
  fallbackGenres,
  fallbackHome,
  fallbackRecommendations,
  fallbackSearch,
} from '../services/fallbackCatalogueService.js';
import { badRequest, notFound } from '../utils/apiError.js';
import type { Anime, AnimeGenre, Character, Episode, Recommendation } from '../types/anime.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import AnimeModel from '../models/animeModel.js';

const CURRENT_YEAR = new Date().getFullYear();
const SEASONS = new Set(['WINTER', 'SPRING', 'SUMMER', 'FALL']);
const TYPES = new Set(['tv', 'movie', 'ova', 'ona', 'special', 'music']);
const STATUSES = new Set(['airing', 'complete', 'upcoming', 'hiatus']);

const HOME_DEADLINE_MS = 9000;

interface SearchVariables {
  [key: string]: unknown;
  page: number;
  perPage: number;
  sort: string[];
  search?: string;
  genres?: string[];
  seasonYear?: number;
  season?: string;
  format?: string;
  status?: string;
  minScore?: number;
  maxScore?: number;
}

type DeadlineResult<T> =
  | { status: 'fulfilled'; value: T }
  | { status: 'rejected'; reason: unknown }
  | { status: 'timedOut' };

/** Resolves with a status after `ms`, without waiting for a slow request. */
function withDeadline<T>(promise: Promise<T>, ms: number): Promise<DeadlineResult<T>> {
  return new Promise((resolve) => {
    const timer = setTimeout(() => resolve({ status: 'timedOut' }), ms);
    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve({ status: 'fulfilled', value });
      },
      (reason: unknown) => {
        clearTimeout(timer);
        resolve({ status: 'rejected', reason });
      }
    );
  });
}

const FORMAT_MAP: Record<string, string> = {
  tv: 'TV',
  movie: 'MOVIE',
  ova: 'OVA',
  ona: 'ONA',
  special: 'SPECIAL',
  music: 'MUSIC',
};

const STATUS_MAP: Record<string, string> = {
  airing: 'RELEASING',
  complete: 'FINISHED',
  upcoming: 'NOT_YET_RELEASED',
  hiatus: 'HIATUS',
};

/** orderBy (frontend-friendly) -> AniList sort */
const ORDER_BY_MAP: Record<string, string[]> = {
  popularity: ['POPULARITY_DESC'],
  score: ['SCORE_DESC', 'POPULARITY_DESC'],
  rating: ['SCORE_DESC', 'POPULARITY_DESC'],
  latest: ['START_DATE_DESC'],
  newest: ['START_DATE_DESC'],
  oldest: ['START_DATE_ASC'],
  title: ['TITLE_ROMAJI'],
  members: ['POPULARITY_DESC'],
  favorites: ['FAVOURITES_DESC'],
  trending: ['TRENDING_DESC'],
};

const toInt = (value: unknown, fallback: number, min: number, max: number): number => {
  const parsed = Number.parseInt(String(value ?? ''), 10);
  if (Number.isNaN(parsed)) return fallback;
  return Math.min(Math.max(parsed, min), max);
};

const parseCsv = (value: unknown, max = 6): string[] =>
  String(value || '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, max);

/** Builds sanitised AniList search variables from the frontend filter state. */
function buildSearchVariables(query: Request['query']): {
  page: number;
  limit: number;
  variables: SearchVariables;
} {
  const page = toInt(query.page, 1, 1, 500);
  const limit = toInt(query.limit, 24, 1, 50);

  const variables: SearchVariables = {
    page,
    perPage: limit,
    sort: ORDER_BY_MAP[String(query.orderBy || query.sortBy || 'popularity').toLowerCase()] || [
      'POPULARITY_DESC',
    ],
  };

  const search = String(query.q || '').trim().slice(0, 100);
  if (search) variables.search = search;

  const genres = parseCsv(query.genres || query.genre)
    .map((id) => genreName(id))
    .filter(Boolean);
  if (genres.length) variables.genres = genres;

  const year = query.year ? toInt(query.year, 0, 1940, CURRENT_YEAR + 2) : null;
  const season = String(query.season || '').toUpperCase();

  if (year) variables.seasonYear = year;
  if (SEASONS.has(season)) {
    variables.season = season;
    if (!variables.seasonYear) variables.seasonYear = CURRENT_YEAR;
  }

  const type = String(query.type || '').toLowerCase();
  if (TYPES.has(type)) variables.format = FORMAT_MAP[type];

  const status = String(query.status || '').toLowerCase();
  if (STATUSES.has(status)) variables.status = STATUS_MAP[status];

  if (query.minScore) {
    const minScore = Number(query.minScore);
    if (!Number.isNaN(minScore)) {
      variables.minScore = Math.min(Math.max(Math.round(minScore * 10), 0), 100);
    }
  }
  if (query.maxScore) {
    const maxScore = Number(query.maxScore);
    if (!Number.isNaN(maxScore)) {
      variables.maxScore = Math.min(Math.max(Math.round(maxScore * 10), 0), 100);
    }
  }

  return { page, limit, variables };
}

function liveGenres(names: string[] = []): Array<AnimeGenre & { count: number }> {
  return names
    .filter((name) => name && name !== 'Hentai')
    .map((name) => ({ ...mapGenre(name), count: 0 }));
}

export const searchAnime = asyncHandler(async (req, res) => {
  const { page, limit, variables } = buildSearchVariables(req.query);

  try {
    const payload = await anilist.search(variables, CACHE_TTL.search);
    res.json({
      success: true,
      data: mapAnimeList(payload.Page?.media || []),
      meta: {
        pagination: mapPagination(payload.Page?.pageInfo, page, limit),
        filters: variables,
        source: 'live',
      },
    });
  } catch {
    const fallback = fallbackSearch({
      q: variables.search,
      page,
      limit,
      genres: variables.genres,
      year: variables.seasonYear ?? null,
      format: variables.format ?? null,
      status: variables.status ?? null,
    });
    res.json({
      success: true,
      data: fallback.data,
      meta: { ...fallback.meta, filters: variables, source: 'cached' },
    });
  }
});

export const getSeasonal = asyncHandler(async (req, res) => {
  const now = new Date();
  const year = toInt(req.query.year, now.getFullYear(), 1940, CURRENT_YEAR + 2);
  const requestedSeason = String(req.query.season || '').toUpperCase();
  const season = SEASONS.has(requestedSeason)
    ? requestedSeason
    : ['WINTER', 'SPRING', 'SUMMER', 'FALL'][Math.floor(now.getMonth() / 3)] ?? 'WINTER';

  const limit = toInt(req.query.limit, 24, 1, 50);
  const page = toInt(req.query.page, 1, 1, 100);

  try {
    const payload = await anilist.search(
      { page, perPage: limit, season, seasonYear: year, sort: ['POPULARITY_DESC'] },
      CACHE_TTL.list
    );

    res.json({
      success: true,
      data: mapAnimeList(payload.Page?.media || []),
      meta: {
        year,
        season: season.toLowerCase(),
        pagination: mapPagination(payload.Page?.pageInfo, page, limit),
        source: 'live',
      },
    });
  } catch {
    const fallback = fallbackSearch({ page, limit });
    res.json({
      success: true,
      data: fallback.data,
      meta: {
        year,
        season: season.toLowerCase(),
        pagination: fallback.meta.pagination,
        source: 'cached',
      },
    });
  }
});

export const getHome = asyncHandler(async (_req, res) => {
  const result = await withDeadline(anilist.home(CACHE_TTL.list), HOME_DEADLINE_MS);

  if (result.status === 'fulfilled') {
    const payload = result.value;
    const trending = mapAnimeList(payload.trending?.media || []);
    const latest = mapAnimeList(payload.currentSeason?.media || []);
    const topRated = mapAnimeList(payload.topRated?.media || []);
    const upcoming = mapAnimeList(payload.upcoming?.media || []);
    const genres = liveGenres(payload.genres || []);

    const empty = !trending.length && !latest.length && !topRated.length && !upcoming.length;
    const fallback = fallbackHome();

    const seen = new Set<number>();
    const hero: Anime[] = [...trending, ...latest, ...topRated]
      .filter((anime) => {
        if (!anime?.malId || seen.has(anime.malId)) return false;
        seen.add(anime.malId);
        return true;
      })
      .slice(0, 5);

    res.json({
      success: true,
      data: {
        hero: hero.length ? hero : fallback.hero,
        trending: trending.length ? trending : fallback.trending,
        latest: latest.length ? latest : fallback.latest,
        topRated: topRated.length ? topRated : fallback.topRated,
        upcoming: upcoming.length ? upcoming : fallback.upcoming,
        genres: genres.length ? genres : fallback.genres,
        source: empty ? 'cached' : 'live',
      },
    });
    return;
  }

  const fallback = fallbackHome();
  res.json({ success: true, data: { ...fallback, source: 'cached' } });
});

export const getAnimeById = asyncHandler(async (req, res) => {
  const animeId = toInt(req.params.id, 0, 1, Number.MAX_SAFE_INTEGER);
  if (!animeId) throw badRequest('A valid anime id is required');

  let anime: Anime; 

  try {
    const payload = await anilist.media(animeId, CACHE_TTL.detail);
    if (!payload.Media) throw notFound('Anime not found');
    anime = mapAnime(payload.Media);
  } catch (error) {
    const cached = fallbackAnimeById(animeId);
    if (!cached) throw error;
    anime = cached;
    anime.cached = true;
  }

  // --- RESTORED MONGODB CUSTOM LOGIC ---
  try {
    const localDbData = await AnimeModel.findOne({ anilistId: animeId });
    if (localDbData) {
      if (localDbData.videoUrl) {
        (anime as any).videoUrl = localDbData.videoUrl;
      }
      if (localDbData.episodes && localDbData.episodes.length > 0) {
        // Overwrites the AniList episode count with your rich episodes array
        (anime as any).episodes = localDbData.episodes; 
      }
    }
  } catch (dbError) {
    console.error("MongoDB query error:", dbError);
  }
  // -------------------------------------

  const trailer = await resolveTrailer({ title: anime.title, trailer: anime.trailer });

  res.json({ success: true, data: { anime, trailer } });
});

const EPISODES_PER_PAGE = 100;

/** Builds a usable episode list from the anime's episode-count metadata. */
function syntheticEpisodes(total: number, page: number): Episode[] {
  const start = (page - 1) * EPISODES_PER_PAGE + 1;
  const end = Math.min(total, page * EPISODES_PER_PAGE);
  if (end < start) return [];

  return Array.from({ length: end - start + 1 }, (_, index) => {
    const number = start + index;
    return {
      malId: number,
      number,
      title: `Episode ${number}`,
      titleJapanese: '',
      aired: null,
      filler: false,
      recap: false,
    };
  });
}

export const getAnimeEpisodes = asyncHandler(async (req, res) => {
  const animeId = toInt(req.params.id, 0, 1, Number.MAX_SAFE_INTEGER);
  if (!animeId) throw badRequest('A valid anime id is required');

  const page = toInt(req.query.page, 1, 1, 200);

  // Episodes are generated from AniList's episode-count metadata - no separate
  // episode request is made, so details/watch pages stay fast and reliable.
  let total = 0;
  try {
    const payload = await anilist.media(animeId, CACHE_TTL.detail);
    const media = payload?.Media;
    total =
      Number(media?.episodes) ||
      (media?.format === 'MOVIE'
        ? 1
        : Math.max(0, (Number(media?.nextAiringEpisode?.episode) || 1) - 1));
  } catch {
    total = Number(fallbackAnimeById(animeId)?.episodes) || 0;
  }

  const episodes = syntheticEpisodes(total, page);

  res.json({
    success: true,
    data: episodes,
    meta: {
      pagination: {
        page,
        lastPage: Math.max(1, Math.ceil(total / EPISODES_PER_PAGE)),
        hasNextPage: page * EPISODES_PER_PAGE < total,
        items: total,
        limit: EPISODES_PER_PAGE,
      },
      totalEpisodes: total,
      generated: true,
    },
  });
});

export const getAnimeRecommendations = asyncHandler(async (req, res) => {
  const animeId = toInt(req.params.id, 0, 1, Number.MAX_SAFE_INTEGER);
  if (!animeId) throw badRequest('A valid anime id is required');

  try {
    const payload = await anilist.media(animeId, CACHE_TTL.detail);
    const nodes = payload?.Media?.recommendations?.nodes || [];
    const recommendations: Recommendation[] = nodes
      .map((node) => node.mediaRecommendation)
      .filter((media): media is NonNullable<typeof media> => Boolean(media))
      .map((media) => ({
        malId: media.id,
        title: media.title?.english || media.title?.romaji || 'Untitled',
        image:
          media.coverImage?.extraLarge ||
          media.coverImage?.large ||
          media.coverImage?.medium ||
          '',
      }));

    res.json({ success: true, data: recommendations.slice(0, 12) });
  } catch {
    res.json({
      success: true,
      data: fallbackRecommendations(animeId).map((anime) => ({
        malId: anime.malId,
        title: anime.title,
        image: anime.image,
      })),
    });
  }
});

export const getAnimeCharacters = asyncHandler(async (req, res) => {
  const animeId = toInt(req.params.id, 0, 1, Number.MAX_SAFE_INTEGER);
  if (!animeId) throw badRequest('A valid anime id is required');

  try {
    const payload = await anilist.media(animeId, CACHE_TTL.detail);
    const characters: Character[] = (payload?.Media?.characters?.edges || [])
      .slice(0, 12)
      .map((edge) => ({
        malId: edge.node?.id ?? 0,
        name: edge.node?.name?.full || '',
        image: edge.node?.image?.large || '',
        role: edge.role || 'SUPPORTING',
        voiceActor: edge.voiceActors?.[0]?.name?.full || '',
      }));

    res.json({ success: true, data: characters });
  } catch {
    res.json({ success: true, data: [] });
  }
});

export const getAnimeTrailer = asyncHandler(async (req, res) => {
  const animeId = toInt(req.params.id, 0, 1, Number.MAX_SAFE_INTEGER);
  if (!animeId) throw badRequest('A valid anime id is required');

  try {
    const payload = await anilist.media(animeId, CACHE_TTL.detail);
    if (!payload.Media) throw notFound('Anime not found');
    const anime = mapAnime(payload.Media);
    const trailer = await resolveTrailer({ title: anime.title, trailer: anime.trailer });
    res.json({ success: true, data: { malId: animeId, title: anime.title, trailer } });
  } catch {
    const cached = fallbackAnimeById(animeId);
    if (!cached) throw notFound('Trailer not available for this anime');
    res.json({ success: true, data: { malId: animeId, title: cached.title, trailer: null } });
  }
});

export const getGenres = asyncHandler(async (_req, res) => {
  try {
    const payload = await anilist.genres(CACHE_TTL.static);
    res.json({ success: true, data: liveGenres(payload.GenreCollection || []) });
  } catch {
    res.json({ success: true, data: fallbackGenres });
  }
});

export const getRandomAnime = asyncHandler(async (_req, res) => {
  try {
    const page = 1 + Math.floor(Math.random() * 40);
    const payload = await anilist.popularPage(page, 10, 60 * 1000);
    const list = mapAnimeList(payload.Page?.media || []);

    if (!list.length) throw notFound('No anime found');

    const anime = list[Math.floor(Math.random() * list.length)];
    res.json({
      success: true,
      data: { malId: anime.malId, title: anime.title, image: anime.image },
    });
  } catch {
    const anime = fallbackAnime[Math.floor(Math.random() * fallbackAnime.length)];
    res.json({
      success: true,
      data: { malId: anime.malId, title: anime.title, image: anime.image },
    });
  }
});
