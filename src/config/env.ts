import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Works both in dev (src/config) and in production (dist/config).
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const intFromEnv = (value: string | undefined, fallback: number): number => {
  const parsed = Number.parseInt(value ?? '', 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

const boolFromEnv = (value: string | undefined, fallback: boolean): boolean => {
  if (value === undefined) return fallback;
  return ['1', 'true', 'yes', 'on'].includes(value.trim().toLowerCase());
};

const urlListFromEnv = (value: string | undefined, fallback: string[]): string[] => {
  const raw = (value ?? '').split(',').map((item) => item.trim()).filter(Boolean);
  return raw.length ? raw : fallback;
};

export const env = {
  nodeEnv: (process.env.NODE_ENV as 'development' | 'production' | 'test' | undefined) ?? 'development',
  port: intFromEnv(process.env.PORT, 5001),
  mongoUri: process.env.MONGODB_URI ?? '',
  jwtSecret: process.env.JWT_SECRET ?? 'development-jwt-secret-change-me',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? '15m',
  refreshTokenDays: intFromEnv(process.env.REFRESH_TOKEN_DAYS, 7),
  adminEmail: process.env.ADMIN_EMAIL ?? '',
  adminPassword: process.env.ADMIN_PASSWORD ?? '',
  adminName: process.env.ADMIN_NAME ?? 'Administrator',
  cookieDomain: process.env.COOKIE_DOMAIN ?? '',
  clientUrl: process.env.CLIENT_URL ?? 'http://localhost:5173',
  clientUrls: urlListFromEnv(process.env.CLIENT_URLS, [process.env.CLIENT_URL ?? 'http://localhost:5173']),
  anilistApiUrl: process.env.ANILIST_API_URL ?? 'https://graphql.anilist.co',
  youtubeApiKey: process.env.YOUTUBE_API_KEY ?? '',
  geminiApiKey: process.env.GEMINI_API_KEY ?? '',
  placeholderVideoUrl: process.env.PLACEHOLDER_VIDEO_URL ?? '',
};

export const isProduction = env.nodeEnv === 'production';
export const isDevelopment = env.nodeEnv === 'development';
export const isTest = env.nodeEnv === 'test';
