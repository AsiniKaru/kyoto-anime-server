import { env } from '../config/env.js';
import { fallbackAnime } from './fallbackCatalogueService.js';
import { anilist, CACHE_TTL } from './anilistService.js';
import { mapAnime, mapAnimeList } from './animeMapperService.js';
import type { Anime } from '../types/anime.js';

interface RecommendInput {
  prompt: string;
  genres?: string[];
}

function fallbackRecommendations(prompt: string, genres: string[] = []): Anime[] {
  const terms = (prompt + ' ' + genres.join(' ')).toLowerCase();
  const scored = fallbackAnime.map((anime) => {
    let score = 0;
    for (const genre of anime.genres) {
      if (terms.includes(genre.name.toLowerCase())) score += 2;
    }
    if (terms.includes(anime.type.toLowerCase())) score += 1;
    if (terms.includes(anime.statusKey)) score += 1;
    return { anime, score };
  });

  scored.sort((a, b) => b.score - a.score);
  const picked = scored.slice(0, 12).map((item) => item.anime);
  return picked.length ? picked : fallbackAnime.slice(0, 12);
}

export async function magicSearch(query: string): Promise<Anime[]> {
  const q = query.trim();
  if (!q) return [];

  if (!env.geminiApiKey) {
    return keywordSearch(q);
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${encodeURIComponent(env.geminiApiKey)}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are an anime expert with knowledge of AniList. The user describes what they want: "${q}". Return a JSON array of AniList anime IDs (integers) that best match this natural-language request. Only include real, existing anime. Return ONLY the JSON array, no markdown, no explanation. Example: [1, 16498, 101922]`,
                },
              ],
            },
          ],
        }),
        signal: AbortSignal.timeout(20000),
      }
    );

    if (!response.ok) throw new Error(`Gemini responded with ${response.status}`);

    const data = (await response.json()) as {
      candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
    };
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text ?? '[]';
    const match = text.match(/\[[\s\S]*\]/);
    const ids: number[] = match
      ? (JSON.parse(match[0]) as unknown[]).filter((n): n is number => Number.isInteger(n) && (n as number) > 0)
      : [];

    const results: Anime[] = [];
    const seen = new Set<number>();

    for (const id of ids.slice(0, 12)) {
      try {
        const payload = await anilist.media(id, CACHE_TTL.detail);
        if (payload.Media) {
          const anime = mapAnime(payload.Media);
          if (!seen.has(anime.malId)) {
            seen.add(anime.malId);
            results.push(anime);
          }
        }
      } catch {
        // skip invalid id
      }
    }

    if (results.length < 4) {
      try {
        const searchPayload = await anilist.search({ page: 1, perPage: 12, search: q, sort: ['POPULARITY_DESC'] }, CACHE_TTL.search);
        const searched = mapAnimeList(searchPayload.Page?.media || []);
        for (const anime of searched) {
          if (!seen.has(anime.malId)) {
            seen.add(anime.malId);
            results.push(anime);
          }
        }
      } catch {
        // ignore
      }
    }

    if (results.length) return results.slice(0, 24);

    return keywordSearch(q);
  } catch {
    return keywordSearch(q);
  }
}

function keywordSearch(query: string): Anime[] {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  const scored = fallbackAnime.map((anime) => {
    let score = 0;
    const haystack = (anime.title + ' ' + anime.synopsis + ' ' + anime.genres.map((g) => g.name).join(' ') + ' ' + anime.type + ' ' + anime.status).toLowerCase();
    for (const term of terms) {
      if (haystack.includes(term)) score += 1;
    }
    for (const genre of anime.genres) {
      if (terms.includes(genre.name.toLowerCase())) score += 2;
    }
    return { anime, score };
  });
  scored.sort((a, b) => b.score - a.score);
  const picked = scored.filter((s) => s.score > 0).slice(0, 24).map((s) => s.anime);
  return picked.length ? picked : fallbackAnime.slice(0, 12);
}

export async function recommendAnime(input: RecommendInput): Promise<Anime[]> {
  const prompt = input.prompt.trim();
  const genres = input.genres ?? [];

  if (!env.geminiApiKey) {
    return fallbackRecommendations(prompt, genres);
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${encodeURIComponent(env.geminiApiKey)}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are an anime recommendation assistant. Given the user request "${prompt}" and preferred genres [${genres.join(', ')}], return a JSON array of anime titles (strings only) that best match. Return ONLY the JSON array, no markdown.`,
                },
              ],
            },
          ],
        }),
        signal: AbortSignal.timeout(20000),
      }
    );

    if (!response.ok) throw new Error(`Gemini responded with ${response.status}`);

    const data = (await response.json()) as {
      candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
    };
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text ?? '[]';
    const match = text.match(/\[[\s\S]*\]/);
    const titles: string[] = match ? (JSON.parse(match[0]) as string[]) : [];

    const lower = titles.map((title) => title.toLowerCase());
    const matched = fallbackAnime.filter((anime) =>
      lower.some(
        (title) =>
          anime.title.toLowerCase().includes(title) || title.includes(anime.title.toLowerCase())
      )
    );

    if (matched.length) return matched.slice(0, 12);
    return fallbackRecommendations(prompt, genres);
  } catch {
    return fallbackRecommendations(prompt, genres);
  }
}
