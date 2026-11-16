import type { Request, RequestHandler } from 'express';
import User, { type UserRole } from '../models/userModel.js';
import { verifyAccessToken } from '../utils/jwt.js';
import { forbidden, unauthorized } from '../utils/apiError.js';

const bearerToken = (req: Request): string | null => {
  const header = req.headers.authorization || '';
  if (header.startsWith('Bearer ')) return header.slice(7).trim();
  if (typeof req.cookies?.token === 'string') return req.cookies.token;
  return null;
};

/**
 * Requires a valid `Authorization: Bearer <token>` header.
 * Attaches the authenticated user document to `req.user`.
 */
export const protect: RequestHandler = async (req, _res, next) => {
  try {
    const token = bearerToken(req);
    if (!token) throw unauthorized('Please log in to continue');

    let payload;
    try {
      payload = verifyAccessToken(token);
    } catch {
      throw unauthorized('Your session has expired. Please log in again');
    }

    const user = await User.findById(payload.sub);
    if (!user) throw unauthorized('The account linked to this session no longer exists');

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

/** Same as protect, but never fails - used for optional personalisation. */
export const optionalAuth: RequestHandler = async (req, _res, next) => {
  const token = bearerToken(req);
  if (!token) return next();

  try {
    const payload = verifyAccessToken(token);
    const user = await User.findById(payload.sub);
    if (user) req.user = user;
  } catch {
    // Ignore invalid tokens for public endpoints
  }
  return next();
};

/** Role-based authorization. Use after `protect`. */
export const authorize =
  (...roles: UserRole[]): RequestHandler =>
  (req, _res, next) => {
    if (!req.user) {
      next(unauthorized('Please log in to continue'));
      return;
    }

    if (!roles.includes(req.user.role)) {
      next(forbidden('You do not have permission to access this resource'));
      return;
    }

    next();
  };

export const adminOnly = authorize('admin');
