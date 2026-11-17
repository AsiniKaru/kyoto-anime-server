import { env } from '../config/env.js';
import { fallbackAnime } from './fallbackCatalogueService.js';
import { anilist, CACHE_TTL } from './anilistService.js';
import { mapAnime, mapAnimeList } from './animeMapperService.js';
import type { Anime } from '../types/anime.js';

interface RecommendInput {
  prompt: string;
  genres?: string[];
}

function detectFormat(query: string): string | null {
  const q = query.toLowerCase();
  if (/\b(movie|film|movies|films)\b/.test(q)) return 'MOVIE';
  if (/\b(tv|series|show|shows)\b/.test(q)) return 'TV';
  if (/\b(ova)\b/.test(q)) return 'OVA';
  if (/\b(ona)\b/.test(q)) return 'ONA';
  return null;
}

function matchesFormat(anime: Anime, format: string | null): boolean {
  if (!format) return true;
  const f = format.toLowerCase();
  if (f === 'movie') return anime.formatKey === 'movie' || anime.type.toLowerCase() === 'movie';
  if (f === 'tv') return anime.formatKey === 'tv' || anime.type.toLowerCase() === 'tv';
  if (f === 'ova') return anime.formatKey === 'ova' || anime.type.toLowerCase() === 'ova';
  if (f === 'ona') return anime.formatKey === 'ona' || anime.type.toLowerCase() === 'ona';
  return true;
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

export async function recommendAnime(input: RecommendInput): Promise<Anime[]> {
  const prompt = input.prompt.trim();
  const genres = input.genres ?? [];

  if (!env.geminiApiKey) {
    return fallbackRecommendations(prompt, genres);
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${encodeURIComponent(env.geminiApiKey)}`,
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

export async function magicSearch(query: string): Promise<Anime[]> {
  const q = query.trim();
  if (!q) return [];

  const format = detectFormat(q);

  if (!env.geminiApiKey) {
    return keywordSearch(q, format);
  }

  try {
    const formatHint = format ? ` The user specifically wants format: ${format}. Only return anime of that format.` : '';
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${encodeURIComponent(env.geminiApiKey)}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are an anime expert with knowledge of AniList. The user describes what they want: "${q}".${formatHint} Return a JSON array of 15 AniList anime IDs (integers) that best match this natural-language request. Only include real, existing anime${format ? ` of format ${format}` : ''}. Return ONLY the JSON array, no markdown, no explanation. Example: [1, 16498, 101922]`,
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

    for (const id of ids.slice(0, 15)) {
      try {
        const payload = await anilist.media(id, CACHE_TTL.detail);
        if (payload.Media) {
          const anime = mapAnime(payload.Media);
          if (!seen.has(anime.malId) && matchesFormat(anime, format)) {
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
        // Try a broader AniList search: drop format-specific words, keep the rest
        const searchTerms = q.replace(/\b(movie|film|movies|films|tv|series|show|shows|ova|ona)\b/gi, '').trim();
        const searchVars: Record<string, unknown> = { page: 1, perPage: 12, sort: ['SCORE_DESC', 'POPULARITY_DESC'] };
        if (searchTerms) searchVars.search = searchTerms;
        if (format) searchVars.format = format;
        const searchPayload = await anilist.search(searchVars, CACHE_TTL.search);
        const searched = mapAnimeList(searchPayload.Page?.media || []);
        for (const anime of searched) {
          if (!seen.has(anime.malId) && matchesFormat(anime, format)) {
            seen.add(anime.malId);
            results.push(anime);
          }
        }
      } catch (e) {
        // ignore
      }
    }

    // If still sparse, fetch popular movies/anime of the requested format
    if (results.length < 4 && format) {
      try {
        const searchVars: Record<string, unknown> = { page: 1, perPage: 12, sort: ['POPULARITY_DESC'] };
        searchVars.format = format;
        const searchPayload = await anilist.search(searchVars, CACHE_TTL.search);
        const searched = mapAnimeList(searchPayload.Page?.media || []);
        for (const anime of searched) {
          if (!seen.has(anime.malId) && matchesFormat(anime, format)) {
            seen.add(anime.malId);
            results.push(anime);
          }
        }
      } catch (e) {
        // ignore
      }
    }

    if (results.length) return results.slice(0, 24);

    return keywordSearch(q, format);
  } catch {
    return keywordSearch(q, format);
  }
}

function keywordSearch(query: string, format: string | null): Anime[] {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  const scored = fallbackAnime
    .filter((anime) => matchesFormat(anime, format))
    .map((anime) => {
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
  return picked.length ? picked : fallbackAnime.filter((a) => matchesFormat(a, format)).slice(0, 12);
}