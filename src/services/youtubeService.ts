import { env } from '../config/env.js';
import { cacheGet, cacheSet } from '../utils/cache.js';
import type { AnimeTrailer } from '../types/anime.js';

const YT_TTL = 24 * 60 * 60 * 1000; // trailers rarely change

export interface ResolvedTrailer {
  source: 'anilist' | 'youtube' | 'search';
  videoId: string | null;
  embedUrl: string | null;
  watchUrl: string;
  searchUrl: string;
  title: string;
}

interface YouTubeSearchItem {
  id?: { videoId?: string | null } | null;
  snippet?: { title?: string | null } | null;
}

interface YouTubeSearchResponse {
  items?: YouTubeSearchItem[] | null;
}

function fallback(title: string): ResolvedTrailer {
  const query = encodeURIComponent(`${title} anime official trailer`);
  return {
    source: 'search',
    videoId: null,
    embedUrl: null,
    watchUrl: `https://www.youtube.com/results?search_query=${query}`,
    searchUrl: `https://www.youtube.com/results?search_query=${query}`,
    title: `${title} - trailer search`,
  };
}

/**
 * Resolve a YouTube trailer for an anime.
 * 1. Prefer the trailer AniList already exposes (no API key needed).
 * 2. Otherwise use the YouTube Data API when YOUTUBE_API_KEY is configured.
 * 3. Otherwise return a pre-filled YouTube search URL.
 */
export async function resolveTrailer({
  title,
  trailer,
}: {
  title: string;
  trailer: AnimeTrailer | null;
}): Promise<ResolvedTrailer> {
  if (trailer?.youtubeId) {
    return {
      source: 'anilist',
      videoId: trailer.youtubeId,
      embedUrl: `https://www.youtube.com/embed/${trailer.youtubeId}`,
      watchUrl: trailer.url || `https://www.youtube.com/watch?v=${trailer.youtubeId}`,
      searchUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent(`${title} trailer`)}`,
      title: `${title} - official trailer`,
    };
  }

  if (!env.youtubeApiKey) return fallback(title);

  const cacheKey = `yt:${title}`;
  const cached = cacheGet<ResolvedTrailer>(cacheKey);
  if (cached) return cached;

  try {
    const url = new URL('https://www.googleapis.com/youtube/v3/search');
    url.searchParams.set('part', 'snippet');
    url.searchParams.set('type', 'video');
    url.searchParams.set('maxResults', '5');
    url.searchParams.set('videoEmbeddable', 'true');
    url.searchParams.set('q', `${title} anime official trailer`);
    url.searchParams.set('key', env.youtubeApiKey);

    const response = await fetch(url, { signal: AbortSignal.timeout(15000) });
    if (!response.ok) return fallback(title);

    const data = (await response.json()) as YouTubeSearchResponse;
    const best = data.items?.find((item) => item.id?.videoId) || null;
    if (!best?.id?.videoId) return fallback(title);

    const videoId = best.id.videoId;
    return cacheSet<ResolvedTrailer>(
      cacheKey,
      {
        source: 'youtube',
        videoId,
        embedUrl: `https://www.youtube.com/embed/${videoId}`,
        watchUrl: `https://www.youtube.com/watch?v=${videoId}`,
        searchUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent(`${title} trailer`)}`,
        title: best.snippet?.title || `${title} trailer`,
      },
      YT_TTL
    );
  } catch {
    return fallback(title);
  }
}
