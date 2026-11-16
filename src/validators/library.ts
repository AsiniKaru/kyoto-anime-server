import { z } from 'zod';
import { WATCH_STATUSES } from '../models/Watchlist.js';

const malId = z.coerce.number().int().positive('A valid anime id is required');

const nullableNumber = z.preprocess(
  (value) => (value === null || value === undefined || value === '' ? null : Number(value)),
  z.number().nullable()
);

const genreList = z
  .array(z.string().trim().min(1))
  .max(10)
  .optional()
  .transform((value) => value ?? []);

export const watchlistSchema = z.object({
  malId,
  title: z.string().trim().min(1, 'Anime title is required').max(200),
  image: z.string().trim().max(500).optional().default(''),
  year: nullableNumber
    .refine((value) => value === null || (Number.isInteger(value) && value >= 1940 && value <= 2100), {
      message: 'Year must be between 1940 and 2100',
    })
    .optional()
    .default(null),
  score: nullableNumber
    .refine((value) => value === null || (value >= 0 && value <= 10), {
      message: 'Score must be between 0 and 10',
    })
    .optional()
    .default(null),
  type: z.string().trim().max(20).optional().default(''),
  genres: genreList,
  status: z.enum(WATCH_STATUSES).optional().default('plan_to_watch'),
});

export const watchlistStatusSchema = z.object({
  status: z.enum(WATCH_STATUSES),
});

export const historySchema = z.object({
  malId,
  title: z.string().trim().min(1, 'Anime title is required').max(200),
  image: z.string().trim().max(500).optional().default(''),
  episode: z.coerce.number().int().min(1).optional().default(1),
  progress: z.coerce.number().min(0).max(100).optional().default(0),
  durationSeconds: z.coerce.number().min(0).optional().default(0),
});

export const reviewSchema = z.object({
  rating: z.coerce.number().min(1, 'Rating must be between 1 and 10').max(10),
  comment: z.string().trim().max(1000).optional().default(''),
  animeTitle: z.string().trim().max(200).optional().default(''),
});

export const idParamSchema = z.object({
  id: z.string().min(1),
});

export type WatchlistInput = z.infer<typeof watchlistSchema>;
export type HistoryInput = z.infer<typeof historySchema>;
export type ReviewInput = z.infer<typeof reviewSchema>;
