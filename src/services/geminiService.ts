import { env } from '../config/env.js';
import { fallbackAnime } from './fallbackCatalogueService.js';
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
