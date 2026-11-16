import type { RequestHandler } from 'express';
import mongoose from 'mongoose';
import { ApiError } from '../utils/apiError.js';

/**
 * Guards database-backed routes. The anime catalogue can still be served from
 * the fallback cache when MongoDB is unavailable, but every mutation and personal
 * data read/write requires a live connection.
 */
export const requireDatabase: RequestHandler = async (_req, _res, next) => {
  if (mongoose.connection.readyState !== 1) {
    next(new ApiError(503, 'Database connection is required for this resource'));
    return;
  }
  next();
};
