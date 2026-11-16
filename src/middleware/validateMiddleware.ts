import type { RequestHandler } from 'express';
import type { ZodTypeAny } from 'zod';
import { badRequest } from '../utils/ApiError.js';

/**
 * Validates and replaces `req.body` with the parsed, typed Zod output.
 * Keeps controllers free of repetitive manual checks.
 */
export const validateBody = (schema: ZodTypeAny): RequestHandler => {
  return (req, _res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const issues = result.error.issues.map((issue) => ({
        field: issue.path.join('.') || 'body',
        message: issue.message,
      }));
      next(badRequest('Validation failed', issues));
      return;
    }

    req.body = result.data;
    next();
  };
};
