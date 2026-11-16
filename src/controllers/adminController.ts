import type { Request } from 'express';
import type { FilterQuery, Types } from 'mongoose';
import User, { type IUser, type UserRole } from '../models/userModel.js';
import Watchlist, { type WatchStatus } from '../models/watchlistModel.js';
import History from '../models/historyModel.js';
import Review from '../models/reviewModel.js';
import RefreshToken from '../models/refreshTokenModel.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { badRequest, notFound, unauthorized } from '../utils/apiError.js';
import type { UpdateRoleInput } from '../validators/admin.js';

interface StatusGroup {
  _id: WatchStatus;
  count: number;
}

interface AnimeGroup {
  _id: number;
  title: string;
  image: string;
  count: number;
}

interface GenreGroup {
  _id: string;
  count: number;
}

interface RatingGroup {
  _id: number;
  count: number;
}

interface CountGroup {
  _id: string;
  count: number;
}

interface AverageGroup {
  _id: null;
  average: number;
}

interface PopulatedReviewUser {
  _id: Types.ObjectId;
  name: string;
}

export interface AdminStats {
  totals: {
    users: number;
    admins: number;
    watchlist: number;
    history: number;
    reviews: number;
  };
  averageRating: number | null;
  signups: Array<{ date: string; count: number }>;
  topAnime: Array<{ malId: number; title: string; image: string; count: number }>;
  topGenres: Array<{ genre: string; count: number }>;
  statusDistribution: Array<{ status: WatchStatus; count: number }>;
  ratingDistribution: Array<{ rating: number; count: number }>;
  recentUsers: Array<{
    id: string;
    name: string;
    email: string;
    role: UserRole;
    avatar: string;
    createdAt: Date;
  }>;
  recentReviews: Array<{
    id: string;
    rating: number;
    comment: string;
    animeTitle: string;
    createdAt: Date;
    user: { id: string | null; name: string };
  }>;
}

function currentUser(req: Request): IUser {
  if (!req.user) throw unauthorized('Please log in to continue');
  return req.user;
}

async function assertNotLastAdmin(target: IUser): Promise<void> {
  if (target.role !== 'admin') return;
  const adminCount = await User.countDocuments({ role: 'admin' });
  if (adminCount <= 1) throw badRequest('At least one administrator must remain');
}

/** Aggregations used by both the JSON dashboard and the PDF report. */
export async function buildAdminStats(): Promise<AdminStats> {
  const since = new Date();
  since.setDate(since.getDate() - 13);
  since.setHours(0, 0, 0, 0);

  const [
    users,
    admins,
    watchlist,
    history,
    reviews,
    averageRows,
    signupRows,
    topAnimeRows,
    topGenreRows,
    statusRows,
    ratingRows,
    recentUsers,
    recentReviews,
  ] = await Promise.all([
    User.countDocuments(),
    User.countDocuments({ role: 'admin' }),
    Watchlist.countDocuments(),
    History.countDocuments(),
    Review.countDocuments(),
    Review.aggregate<AverageGroup>([
      { $group: { _id: null, average: { $avg: '$rating' } } },
    ]),
    User.aggregate<CountGroup>([
      { $match: { createdAt: { $gte: since } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]),
    Watchlist.aggregate<AnimeGroup>([
      {
        $group: {
          _id: '$malId',
          title: { $first: '$title' },
          image: { $first: '$image' },
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 8 },
    ]),
    Watchlist.aggregate<GenreGroup>([
      { $unwind: '$genres' },
      { $group: { _id: '$genres', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 8 },
    ]),
    Watchlist.aggregate<StatusGroup>([
      { $group: { _id: '$status', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]),
    Review.aggregate<RatingGroup>([
      { $group: { _id: '$rating', count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]),
    User.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name email role avatar createdAt')
      .lean(),
    Review.find()
      .sort({ createdAt: -1 })
      .limit(6)
      .populate<{ user: PopulatedReviewUser | null }>('user', 'name')
      .lean(),
  ]);

  const signupMap = new Map(signupRows.map((row) => [row._id, row.count]));
  const signups = Array.from({ length: 14 }, (_, index) => {
    const date = new Date(since);
    date.setDate(since.getDate() + index);
    const key = date.toISOString().slice(0, 10);
    return { date: key, count: signupMap.get(key) || 0 };
  });

  return {
    totals: { users, admins, watchlist, history, reviews },
    averageRating: averageRows[0]?.average
      ? Number(averageRows[0].average.toFixed(2))
      : null,
    signups,
    topAnime: topAnimeRows.map((row) => ({
      malId: row._id,
      title: row.title,
      image: row.image,
      count: row.count,
    })),
    topGenres: topGenreRows.map((row) => ({ genre: row._id, count: row.count })),
    statusDistribution: statusRows.map((row) => ({ status: row._id, count: row.count })),
    ratingDistribution: ratingRows.map((row) => ({ rating: row._id, count: row.count })),
    recentUsers: recentUsers.map((user) => ({
      id: String(user._id),
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      createdAt: user.createdAt,
    })),
    recentReviews: recentReviews.map((review) => ({
      id: String(review._id),
      rating: review.rating,
      comment: review.comment,
      animeTitle: review.animeTitle,
      createdAt: review.createdAt,
      user: {
        id: review.user?._id ? String(review.user._id) : null,
        name: review.user?.name || 'Deleted user',
      },
    })),
  };
}

export const getAdminStats = asyncHandler(async (_req, res) => {
  res.json({ success: true, data: await buildAdminStats() });
});

export const getAdminUsers = asyncHandler(async (req, res) => {
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(50, Math.max(1, Number(req.query.limit) || 10));
  const query = String(req.query.q || '').trim().slice(0, 80);

  const filter: FilterQuery<IUser> = {};
  if (query) {
    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    filter.$or = [
      { name: { $regex: escaped, $options: 'i' } },
      { email: { $regex: escaped, $options: 'i' } },
    ];
  }

  const [users, total] = await Promise.all([
    User.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .select('-password')
      .lean(),
    User.countDocuments(filter),
  ]);

  const data = await Promise.all(
    users.map(async (user) => {
      const [watchlistCount, reviewCount] = await Promise.all([
        Watchlist.countDocuments({ user: user._id }),
        Review.countDocuments({ user: user._id }),
      ]);

      return {
        id: String(user._id),
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        bio: user.bio,
        createdAt: user.createdAt,
        stats: { watchlist: watchlistCount, reviews: reviewCount },
      };
    })
  );

  res.json({
    success: true,
    data,
    meta: {
      page,
      limit,
      total,
      lastPage: Math.max(1, Math.ceil(total / limit)),
    },
  });
});

export const updateUserRole = asyncHandler(async (req, res) => {
  const admin = currentUser(req);
  const { role } = req.body as UpdateRoleInput;

  const target = await User.findById(req.params.id);
  if (!target) throw notFound('User not found');

  if (target._id.equals(admin._id) && role !== 'admin') {
    throw badRequest('You cannot remove your own administrator role');
  }

  if (role === 'user') await assertNotLastAdmin(target);

  target.role = role;
  await target.save();

  res.json({
    success: true,
    message: `${target.name} is now ${role === 'admin' ? 'an administrator' : 'a member'}`,
    data: { user: target.toJSON() },
  });
});

export const deleteUser = asyncHandler(async (req, res) => {
  const admin = currentUser(req);
  const target = await User.findById(req.params.id);
  if (!target) throw notFound('User not found');

  if (target._id.equals(admin._id)) {
    throw badRequest('You cannot delete your own account from the admin dashboard');
  }

  await assertNotLastAdmin(target);

  await Promise.all([
    Watchlist.deleteMany({ user: target._id }),
    History.deleteMany({ user: target._id }),
    Review.deleteMany({ user: target._id }),
    RefreshToken.deleteMany({ user: target._id }),
    target.deleteOne(),
  ]);

  res.json({ success: true, message: `${target.name}'s account was deleted` });
});

export const getAdminReviews = asyncHandler(async (_req, res) => {
  const reviews = await Review.find()
    .sort({ createdAt: -1 })
    .limit(40)
    .populate<{ user: PopulatedReviewUser | null }>('user', 'name')
    .lean();

  res.json({
    success: true,
    data: reviews.map((review) => ({
      id: String(review._id),
      malId: review.malId,
      rating: review.rating,
      comment: review.comment,
      animeTitle: review.animeTitle,
      createdAt: review.createdAt,
      user: {
        id: review.user?._id ? String(review.user._id) : null,
        name: review.user?.name || 'Deleted user',
      },
    })),
  });
});
