import type { Request } from 'express';
import type { FilterQuery, Types } from 'mongoose';
import Watchlist, {
  WATCH_STATUSES,
  isWatchStatus,
  type IWatchlist,
  type WatchStatus,
} from '../models/watchlistModel.js';
import History from '../models/historyModel.js';
import Review from '../models/refreshTokenModel.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { badRequest, notFound, unauthorized } from '../utils/apiError.js';
import { cleanString } from '../utils/validate.js';
import type { HistoryInput, ReviewInput, WatchlistInput } from '../validators/library.js';

const toMalId = (value: unknown): number | null => {
  const id = Number.parseInt(String(value ?? ''), 10);
  return Number.isNaN(id) || id <= 0 ? null : id;
};

function currentUserId(req: Request): Types.ObjectId {
  if (!req.user) throw unauthorized('Please log in to continue');
  return req.user._id;
}

/* ----------------------------- Watchlist ----------------------------- */

export const getWatchlist = asyncHandler(async (req, res) => {
  const userId = currentUserId(req);
  const filter: FilterQuery<IWatchlist> = { user: userId };

  if (typeof req.query.status === 'string' && isWatchStatus(req.query.status)) {
    filter.status = req.query.status;
  }

  const items = await Watchlist.find(filter).sort({ updatedAt: -1 }).lean();

  res.json({
    success: true,
    data: items,
    meta: { total: items.length },
  });
});

export const getWatchlistEntry = asyncHandler(async (req, res) => {
  const userId = currentUserId(req);
  const malId = toMalId(req.params.malId);
  if (!malId) throw badRequest('A valid anime id is required');

  const entry = await Watchlist.findOne({ user: userId, malId }).lean();
  res.json({ success: true, data: entry || null });
});

export const upsertWatchlistEntry = asyncHandler(async (req, res) => {
  const userId = currentUserId(req);
  const body = req.body as WatchlistInput;

  const payload = {
    malId: body.malId,
    title: cleanString(body.title).slice(0, 200),
    image: cleanString(body.image).slice(0, 500),
    year: body.year ?? null,
    score: body.score ?? null,
    type: cleanString(body.type).slice(0, 20),
    genres: body.genres.map((genre) => cleanString(genre)).filter(Boolean).slice(0, 10),
    status: body.status,
  };

  const entry = await Watchlist.findOneAndUpdate(
    { user: userId, malId: payload.malId },
    { $set: payload },
    { new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true }
  ).lean();

  res.status(201).json({
    success: true,
    message: `Added "${payload.title}" to your list`,
    data: entry,
  });
});

export const updateWatchlistEntry = asyncHandler(async (req, res) => {
  const userId = currentUserId(req);
  const malId = toMalId(req.params.malId);
  if (!malId) throw badRequest('A valid anime id is required');

  const { status } = req.body as { status?: string };
  if (!isWatchStatus(status)) {
    throw badRequest(`Status must be one of: ${WATCH_STATUSES.join(', ')}`);
  }

  const entry = await Watchlist.findOneAndUpdate(
    { user: userId, malId },
    { $set: { status } },
    { new: true, runValidators: true }
  ).lean();

  if (!entry) throw notFound('That anime is not in your list');

  res.json({ success: true, message: 'List updated', data: entry });
});

export const removeWatchlistEntry = asyncHandler(async (req, res) => {
  const userId = currentUserId(req);
  const malId = toMalId(req.params.malId);
  if (!malId) throw badRequest('A valid anime id is required');

  const result = await Watchlist.findOneAndDelete({ user: userId, malId });
  if (!result) throw notFound('That anime is not in your list');

  res.json({ success: true, message: 'Removed from your list' });
});

/* ------------------------------ History ------------------------------ */

export const getHistory = asyncHandler(async (req, res) => {
  const userId = currentUserId(req);
  const limit = Math.min(Number(req.query.limit) || 30, 60);
  const items = await History.find({ user: userId })
    .sort({ lastWatchedAt: -1 })
    .limit(limit)
    .lean();

  res.json({ success: true, data: items, meta: { total: items.length } });
});

export const upsertHistory = asyncHandler(async (req, res) => {
  const userId = currentUserId(req);
  const body = req.body as HistoryInput;

  const entry = await History.findOneAndUpdate(
    { user: userId, malId: body.malId },
    {
      $set: {
        title: cleanString(body.title).slice(0, 200),
        image: cleanString(body.image).slice(0, 500),
        episode: body.episode,
        progress: body.progress,
        durationSeconds: body.durationSeconds,
        lastWatchedAt: new Date(),
      },
    },
    { new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true }
  ).lean();

  // Watching an anime automatically puts it in "watching" if not listed yet
  await Watchlist.findOneAndUpdate(
    { user: userId, malId: body.malId },
    {
      $setOnInsert: {
        title: cleanString(body.title).slice(0, 200),
        image: cleanString(body.image).slice(0, 500),
        status: 'watching',
      },
    },
    { upsert: true, setDefaultsOnInsert: true }
  );

  res.status(201).json({ success: true, data: entry });
});

export const removeHistoryEntry = asyncHandler(async (req, res) => {
  const userId = currentUserId(req);
  const malId = toMalId(req.params.malId);
  if (!malId) throw badRequest('A valid anime id is required');

  await History.findOneAndDelete({ user: userId, malId });
  res.json({ success: true, message: 'Removed from watch history' });
});

export const clearHistory = asyncHandler(async (req, res) => {
  const userId = currentUserId(req);
  await History.deleteMany({ user: userId });
  res.json({ success: true, message: 'Watch history cleared' });
});

/* ------------------------------ Reviews ------------------------------ */

interface PopulatedReviewUser {
  _id: Types.ObjectId;
  name: string;
  avatar: string;
}

export const getAnimeReviews = asyncHandler(async (req, res) => {
  const malId = toMalId(req.params.malId);
  if (!malId) throw badRequest('A valid anime id is required');

  const reviews = await Review.find({ malId })
    .populate<{ user: PopulatedReviewUser | null }>('user', 'name avatar')
    .sort({ createdAt: -1 })
    .limit(50)
    .lean();

  const summary = reviews.reduce(
    (acc, review) => {
      acc.total += 1;
      acc.sum += review.rating;
      return acc;
    },
    { total: 0, sum: 0 }
  );

  res.json({
    success: true,
    data: reviews.map((review) => ({
      id: review._id,
      rating: review.rating,
      comment: review.comment,
      createdAt: review.createdAt,
      user: {
        id: review.user?._id ?? null,
        name: review.user?.name || 'Deleted user',
        avatar: review.user?.avatar || '',
      },
    })),
    meta: {
      total: summary.total,
      average: summary.total ? Number((summary.sum / summary.total).toFixed(1)) : null,
    },
  });
});

export const upsertReview = asyncHandler(async (req, res) => {
  const userId = currentUserId(req);
  const malId = toMalId(req.params.malId);
  if (!malId) throw badRequest('A valid anime id is required');

  const body = req.body as ReviewInput;

  const review = await Review.findOneAndUpdate(
    { user: userId, malId },
    {
      $set: {
        rating: body.rating,
        comment: cleanString(body.comment).slice(0, 1000),
        animeTitle: cleanString(body.animeTitle).slice(0, 200),
      },
    },
    { new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true }
  ).lean();

  res.status(201).json({
    success: true,
    message: 'Thanks for rating this anime!',
    data: review,
  });
});

export const deleteReview = asyncHandler(async (req, res) => {
  const userId = currentUserId(req);

  const review = await Review.findOneAndDelete({
    _id: req.params.id,
    user: userId,
  });

  if (!review) throw notFound('Review not found');

  res.json({ success: true, message: 'Review deleted' });
});

export const getMyReviews = asyncHandler(async (req, res) => {
  const userId = currentUserId(req);
  const reviews = await Review.find({ user: userId }).sort({ createdAt: -1 }).lean();
  res.json({ success: true, data: reviews });
});

/* ------------------------------- Stats ------------------------------- */

interface StatusGroup {
  _id: WatchStatus;
  count: number;
}

interface SecondsGroup {
  _id: null;
  totalSeconds: number;
}

export const getLibraryStats = asyncHandler(async (req, res) => {
  const userId = currentUserId(req);

  const [statusGroups, historyCount, reviewCount, continueWatching, minutes] = await Promise.all([
    Watchlist.aggregate<StatusGroup>([
      { $match: { user: userId } },
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]),
    History.countDocuments({ user: userId }),
    Review.countDocuments({ user: userId }),
    History.find({ user: userId, progress: { $lt: 95 } })
      .sort({ lastWatchedAt: -1 })
      .limit(10)
      .lean(),
    History.aggregate<SecondsGroup>([
      { $match: { user: userId } },
      { $group: { _id: null, totalSeconds: { $sum: '$durationSeconds' } } },
    ]),
  ]);

  const byStatus = statusGroups.reduce<Record<string, number>>((acc, group) => {
    acc[group._id] = group.count;
    return acc;
  }, {});

  res.json({
    success: true,
    data: {
      byStatus,
      watchlistTotal: Object.values(byStatus).reduce((sum, count) => sum + count, 0),
      historyCount,
      reviewCount,
      continueWatching,
      minutesWatched: Math.round((minutes[0]?.totalSeconds || 0) / 60),
    },
  });
});
