export class ApiError extends Error {
  readonly statusCode: number;
  readonly details: unknown;
  readonly isOperational: boolean;

  constructor(statusCode: number, message: string, details: unknown = null) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const badRequest = (msg = 'Bad request', details?: unknown): ApiError =>
  new ApiError(400, msg, details);
export const unauthorized = (msg = 'Not authorized'): ApiError => new ApiError(401, msg);
export const forbidden = (msg = 'Forbidden'): ApiError => new ApiError(403, msg);
export const notFound = (msg = 'Resource not found'): ApiError => new ApiError(404, msg);
export const conflict = (msg = 'Resource already exists'): ApiError => new ApiError(409, msg);
