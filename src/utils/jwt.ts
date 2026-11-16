import jwt, { type JwtPayload, type SignOptions } from 'jsonwebtoken';
import { env } from '../config/env.js';
import type { UserRole } from '../models/userModel.js';

export interface AccessTokenPayload extends JwtPayload {
  sub: string;
  role: UserRole;
  type: 'access';
}

export function signAccessToken(user: { _id: unknown; role: UserRole }): string {
  const options: SignOptions = {
    expiresIn: env.jwtExpiresIn as SignOptions['expiresIn'],
  };

  return jwt.sign(
    {
      sub: String(user._id),
      role: user.role,
      type: 'access',
    },
    env.jwtSecret,
    options
  );
}

export function verifyAccessToken(token: string): AccessTokenPayload {
  const payload = jwt.verify(token, env.jwtSecret);

  if (typeof payload === 'string' || payload.type !== 'access' || !payload.sub) {
    throw new Error('Invalid access token');
  }

  return payload as AccessTokenPayload;
}
