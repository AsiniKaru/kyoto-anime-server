import type { IUser } from '../models/User.js';

declare global {
  namespace Express {
    interface Request {
      /** Set by the `protect` middleware after verifying the access token. */
      user?: IUser;
    }
  }
}

export {};
