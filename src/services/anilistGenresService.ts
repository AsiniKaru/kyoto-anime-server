/** AniList genre names. The array index + 1 doubles as the UI filter id. */
import type { AnimeGenre } from '../types/anime.js';

export const ANILIST_GENRES: string[] = [
  'Action',
  'Adventure',
  'Comedy',
  'Drama',
  'Ecchi',
  'Fantasy',
  'Horror',
  'Mahou Shoujo',
  'Mecha',
  'Music',
  'Mystery',
  'Psychological',
  'Romance',
  'Sci-Fi',
  'Slice of Life',
  'Sports',
  'Supernatural',
  'Thriller',
];

export function genreId(name: string): number | null {
  const index = ANILIST_GENRES.indexOf(name);
  return index === -1 ? null : index + 1;
}

export function genreName(id: string | number): string {
  return ANILIST_GENRES[Number(id) - 1] || '';
}

export function mapGenre(name: string): AnimeGenre {
  return { malId: genreId(name) ?? 0, name };
}
