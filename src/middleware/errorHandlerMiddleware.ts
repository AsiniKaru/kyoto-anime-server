
import type { NextFunction, Request, Response } from 'express';
import { ApiError } from '../utils/apiError.js';
import { isProduction } from '../config/env.js';

interface MongoLikeError extends Error {
  statusCode?: number;
  details?: unknown;
  code?: number;
  keyValue?: Record<string, unknown>;
  errors?: Record<string, { message: string }>;
}

export function notFoundHandler(req: Request, _res: Response, next: NextFunction): void {
  next(new ApiError(404, `Route not found: ${req.method} ${req.originalUrl}`));
}

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  const error = err as MongoLikeError;
  let statusCode = error.statusCode || 500;
  let message = error.message || 'Something went wrong';
  let details: unknown = error.details || null;
  let errors: unknown[] | undefined = undefined;

  // Mongoose validation errors
  if (error.name === 'ValidationError' && error.errors) {
    statusCode = 400;
    const messages = Object.values(error.errors).map((item) => item.message);
    details = messages;
    errors = messages;
    message = messages[0] || 'Validation failed';
  }

  // Duplicate key (e.g. email already registered)
  if (error.code === 11000) {
    statusCode = 409;
    const field = Object.keys(error.keyValue || {})[0] || 'field';
    message = `${field === 'email' ? 'This email' : 'This record'} is already in use`;
  }

  // Invalid ObjectId
  if (error.name === 'CastError') {
    statusCode = 400;
    message = 'Invalid identifier supplied';
  }

  if (statusCode >= 500) {
    console.error('[error]', error);
  }

  res.status(statusCode).json({
    success: false,
    message,
    data: null,
    ...(errors ? { errors } : {}),
    ...(details && !errors ? { details } : {}),
    ...(isProduction ? {} : { stack: error.stack }),
  });
}
