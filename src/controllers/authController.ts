import crypto from 'node:crypto';
import type { CookieOptions, Request, Response } from 'express';
import User, { type IUser } from '../models/User.js';
import RefreshToken from '../models/RefreshToken.js';
import Watchlist from '../models/Watchlist.js';
import History from '../models/History.js';
import Review from '../models/Review.js';
import { signAccessToken } from '../utils/jwt.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { badRequest, conflict, unauthorized, notFound } from '../utils/ApiError.js';
import { env, isProduction } from '../config/env.js';
import type {
  ChangePasswordInput,
  LoginInput,
  RegisterInput,
  UpdateProfileInput,
} from '../validators/auth.js';

const REFRESH_COOKIE = 'sayonara_refresh';
const REFRESH_COOKIE_PATH = '/api/auth';

const refreshCookieOptions = (): CookieOptions => ({
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? 'none' : 'lax',
  path: REFRESH_COOKIE_PATH,
  ...(env.cookieDomain ? { domain: env.cookieDomain } : {}),
});

const hashToken = (token: string): string =>
  crypto.createHash('sha256').update(token).digest('hex');

const newRefreshToken = (): string => crypto.randomBytes(48).toString('hex');

const clearRefreshCookie = (res: Response): void => {
  res.clearCookie(REFRESH_COOKIE, { ...refreshCookieOptions(), maxAge: 0 });
};

interface SessionResult {
  accessToken: string;
}

/** Creates a new refresh token (rotation) and sets it as an httpOnly cookie. */
async function issueSession(user: IUser, req: Request, res: Response): Promise<SessionResult> {
  const token = newRefreshToken();
  const expiresAt = new Date(Date.now() + env.refreshTokenDays * 24 * 60 * 60 * 1000);

  await RefreshToken.create({
    user: user._id,
    tokenHash: hashToken(token),
    expiresAt,
    createdByIp: req.ip || '',
    userAgent: req.get('user-agent') || '',
  });

  // Keep only the five most recent sessions per account.
  const extra = await RefreshToken.find({ user: user._id })
    .sort({ createdAt: -1 })
    .skip(5)
    .select('_id')
    .lean();

  if (extra.length) {
    await RefreshToken.deleteMany({ _id: { $in: extra.map((item) => item._id) } });
  }

  // Remove already-expired tokens opportunistically.
  await RefreshToken.deleteMany({ user: user._id, expiresAt: { $lt: new Date() } });

  res.cookie(REFRESH_COOKIE, token, {
    ...refreshCookieOptions(),
    maxAge: env.refreshTokenDays * 24 * 60 * 60 * 1000,
  });

  return { accessToken: signAccessToken(user) };
}

const sessionPayload = (user: IUser, accessToken: string) => ({
  user: user.toJSON(),
  accessToken,
  tokenType: 'Bearer' as const,
  expiresIn: env.jwtExpiresIn,
});

export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body as RegisterInput;

  const existing = await User.findOne({ email });
  if (existing) throw conflict('An account with this email already exists');

  const user = await User.create({ name, email, password, role: 'user' });
  const session = await issueSession(user, req, res);

  res.status(201).json({
    success: true,
    message: `Welcome to SayonaraAnime, ${user.name.split(' ')[0]}!`,
    data: sessionPayload(user, session.accessToken),
  });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body as LoginInput;

  const user = await User.findOne({ email }).select('+password');
  const matches = user ? await user.comparePassword(password) : false;

  if (!user || !matches) throw unauthorized('Invalid email or password');

  const session = await issueSession(user, req, res);

  res.json({
    success: true,
    message: `Welcome back, ${user.name.split(' ')[0]}!`,
    data: sessionPayload(user, session.accessToken),
  });
});

/** Exchange the httpOnly refresh cookie for a fresh access token. */
export const refresh = asyncHandler(async (req, res) => {
  const token =
    (req.cookies?.[REFRESH_COOKIE] as string | undefined) ||
    (req.body?.refreshToken as string | undefined);

  if (!token) {
    clearRefreshCookie(res);
    throw unauthorized('No refresh token supplied. Please log in again');
  }

  const stored = await RefreshToken.findOne({ tokenHash: hashToken(token) }).populate<{
    user: IUser | null;
  }>('user');

  if (!stored) {
    clearRefreshCookie(res);
    throw unauthorized('Your session has expired. Please log in again');
  }

  if (stored.expiresAt.getTime() < Date.now() || !stored.user) {
    await stored.deleteOne();
    clearRefreshCookie(res);
    throw unauthorized('Your session has expired. Please log in again');
  }

  // Rotate: the old refresh token is single-use.
  await stored.deleteOne();
  const session = await issueSession(stored.user, req, res);

  res.json({
    success: true,
    data: sessionPayload(stored.user, session.accessToken),
  });
});

export const logout = asyncHandler(async (req, res) => {
  const token =
    (req.cookies?.[REFRESH_COOKIE] as string | undefined) ||
    (req.body?.refreshToken as string | undefined);

  if (token) {
    await RefreshToken.deleteOne({ tokenHash: hashToken(token) });
  }

  clearRefreshCookie(res);
  res.json({ success: true, message: 'Logged out successfully' });
});

export const getMe = asyncHandler(async (req, res) => {
  if (!req.user) throw unauthorized('Please log in to continue');
  res.json({ success: true, data: { user: req.user.toJSON() } });
});

export const updateProfile = asyncHandler(async (req, res) => {
  const current = req.user;
  if (!current) throw unauthorized('Please log in to continue');

  const body = req.body as UpdateProfileInput;
  const updates: Partial<Pick<IUser, 'name' | 'email' | 'avatar' | 'bio'>> = {};

  if (body.name !== undefined) updates.name = body.name;
  if (body.avatar !== undefined) updates.avatar = body.avatar;
  if (body.bio !== undefined) updates.bio = body.bio;

  if (body.email !== undefined) {
    const taken = await User.findOne({ email: body.email, _id: { $ne: current._id } });
    if (taken) throw conflict('That email is already in use');
    updates.email = body.email;
  }

  const user = await User.findByIdAndUpdate(current._id, updates, {
    new: true,
    runValidators: true,
  });

  if (!user) throw notFound('User not found');

  res.json({ success: true, message: 'Profile updated', data: { user: user.toJSON() } });
});

export const updatePassword = asyncHandler(async (req, res) => {
  const current = req.user;
  if (!current) throw unauthorized('Please log in to continue');

  const { currentPassword, newPassword } = req.body as ChangePasswordInput;

  const user = await User.findById(current._id).select('+password');
  if (!user) throw notFound('User not found');

  const matches = await user.comparePassword(currentPassword);
  if (!matches) throw badRequest('Your current password is incorrect');

  user.password = newPassword;
  await user.save({ validateBeforeSave: true });

  // Revoke every other session, then issue a new one for this device.
  await RefreshToken.deleteMany({ user: user._id });
  const session = await issueSession(user, req, res);

  res.json({
    success: true,
    message: 'Password updated successfully',
    data: sessionPayload(user, session.accessToken),
  });
});

export const deleteAccount = asyncHandler(async (req, res) => {
  const current = req.user;
  if (!current) throw unauthorized('Please log in to continue');

  const { password } = req.body as { password: string };

  const user = await User.findById(current._id).select('+password');
  if (!user) throw notFound('User not found');

  const matches = await user.comparePassword(password);
  if (!matches) throw unauthorized('Password is incorrect');

  await Promise.all([
    Watchlist.deleteMany({ user: user._id }),
    History.deleteMany({ user: user._id }),
    Review.deleteMany({ user: user._id }),
    RefreshToken.deleteMany({ user: user._id }),
    user.deleteOne(),
  ]);

  clearRefreshCookie(res);
  res.json({ success: true, message: 'Your account and library were deleted' });
});
