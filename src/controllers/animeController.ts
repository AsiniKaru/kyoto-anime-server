import { Request, Response } from 'express';
import Anime from '../models/animeModel.js';

const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const asString = (v: unknown): string => (typeof v === 'string' ? v.trim() : '');

const SORTS: Record<string, Record<string, 1 | -1>> = {
  popularity: { popularity: -1 },
  score: { score: -1 },
  newest: { year: -1, popularity: -1 },
  title: { 'title.romaji': 1 },
};

// GET /api/anime?q=&genre=&year=&format=&status=&sort=&page=&limit=
export const listAnime = async (req: Request, res: Response) => {
  try {
    const q = asString(req.query.q);
    const genre = asString(req.query.genre);
    const year = Number(req.query.year);
    const format = asString(req.query.format);
    const status = asString(req.query.status);
    const sort = SORTS[asString(req.query.sort)] ?? SORTS.popularity;
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(48, Math.max(1, Number(req.query.limit) || 24));

    const filter: Record<string, unknown> = {};
    if (q) {
      const rx = { $regex: escapeRegex(q), $options: 'i' };
      filter.$or = [{ 'title.romaji': rx }, { 'title.english': rx }, { 'title.native': rx }];
    }
    if (genre) filter.genres = genre;
    if (Number.isInteger(year) && year > 0) filter.year = year;
    if (format) filter.format = format;
    if (status) filter.status = status;

    const [results, total] = await Promise.all([
      Anime.find(filter)
        .select('anilistId title genres format status episodes year score coverImage')
        .sort(sort)
        .skip((page - 1) * limit)
        .limit(limit),
      Anime.countDocuments(filter),
    ]);
    res.json({ page, limit, total, totalPages: Math.ceil(total / limit), results });
  } catch {
    res.status(500).json({ message: 'Could not load anime' });
  }
};

// GET /api/anime/genres
export const getGenres = async (_req: Request, res: Response) => {
  try {
    const genres = (await Anime.distinct('genres')) as string[];
    res.json(genres.sort());
  } catch {
    res.status(500).json({ message: 'Could not load genres' });
  }
};

// GET /api/anime/schedule : currently airing anime, soonest episode first
export const getSchedule = async (_req: Request, res: Response) => {
  try {
    const results = await Anime.find({ 'nextEpisode.airingAt': { $gte: new Date() } })
      .select('anilistId title coverImage nextEpisode episodes')
      .sort({ 'nextEpisode.airingAt': 1 })
      .limit(60);
    res.json(results);
  } catch {
    res.status(500).json({ message: 'Could not load schedule' });
  }
};

// GET /api/anime/:id  (AniList id)
export const getAnime = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      res.status(400).json({ message: 'Invalid anime id' });
      return;
    }
    const anime = await Anime.findOne({ anilistId: id });
    if (!anime) {
      res.status(404).json({ message: 'Anime not found' });
      return;
    }
    res.json(anime);
  } catch {
    res.status(500).json({ message: 'Could not load anime' });
  }
};
