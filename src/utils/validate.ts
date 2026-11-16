import mongoose from 'mongoose';

/** Returns true when an id is a valid MongoDB ObjectId. */
export const isValidObjectId = (id: unknown): boolean =>
  typeof id === 'string' && mongoose.Types.ObjectId.isValid(id);

/** Trims and normalises text input. */
export const cleanString = (value: unknown): string =>
  typeof value === 'string' ? value.trim() : '';

/**
 * Basic email/password validation helpers shared by the auth controller.
 */
export const isValidEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const passwordProblem = (password: unknown): string | null => {
  if (typeof password !== 'string' || password.length < 6) {
    return 'Password must be at least 6 characters long';
  }
  if (password.length > 128) return 'Password is too long';
  return null;
};
