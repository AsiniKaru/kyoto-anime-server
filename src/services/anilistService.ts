import axios from 'axios';

// AniList public GraphQL API: free, no API key needed for public data.
// Docs: https://docs.anilist.co  (rate limit is low, so we go slowly and retry on 429)
const QUERY = `
query ($page: Int, $perPage: Int) {
  Page(page: $page, perPage: $perPage) {
    pageInfo { hasNextPage }
    media(type: ANIME, sort: POPULARITY_DESC, isAdult: false) {
      id
      idMal
      title { romaji english native }
      description(asHtml: false)
      genres
      format
      status
      episodes
      season
      seasonYear
      averageScore
      popularity
      coverImage { extraLarge large }
      bannerImage
      trailer { id site }
      studios(isMain: true) { nodes { name } }
      nextAiringEpisode { airingAt episode }
    }
  }
}`;

export interface AniListMedia {
  id: number;
  idMal: number | null;
  title: { romaji: string; english: string | null; native: string | null };
  description: string | null;
  genres: string[];
  format: string | null;
  status: string | null;
  episodes: number | null;
  season: string | null;
  seasonYear: number | null;
  averageScore: number | null;
  popularity: number | null;
  coverImage: { extraLarge: string | null; large: string | null } | null;
  bannerImage: string | null;
  trailer: { id: string | null; site: string | null } | null;
  studios: { nodes: { name: string }[] };
  nextAiringEpisode: { airingAt: number; episode: number } | null;
}

interface PageResult {
  media: AniListMedia[];
  hasNextPage: boolean;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function fetchAnimePage(page: number, perPage = 50): Promise<PageResult> {
  const url = process.env.ANILIST_API_URL || 'https://graphql.anilist.co';
  for (let attempt = 1; attempt <= 4; attempt++) {
    try {
      const { data } = await axios.post(
        url,
        { query: QUERY, variables: { page, perPage } },
        { timeout: 20000, headers: { 'Content-Type': 'application/json', Accept: 'application/json' } }
      );
      if (data.errors) throw new Error(data.errors[0]?.message || 'AniList returned an error');
      return { media: data.data.Page.media, hasNextPage: data.data.Page.pageInfo.hasNextPage };
    } catch (err) {
      const status = axios.isAxiosError(err) ? err.response?.status : undefined;
      if (attempt === 4) throw err;
      // Rate limited: wait for the time AniList asks for (or 65 seconds), then try again
      const retryAfter = axios.isAxiosError(err) ? Number(err.response?.headers['retry-after']) : NaN;
      const wait = status === 429 ? (retryAfter > 0 ? retryAfter * 1000 : 65000) : 3000 * attempt;
      console.log(`  attempt ${attempt} failed (${status ?? (err as Error).message}). Retrying in ${Math.round(wait / 1000)}s...`);
      await sleep(wait);
    }
  }
  throw new Error('unreachable');
}
