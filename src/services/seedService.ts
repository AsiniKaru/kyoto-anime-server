import User from '../models/User.js';
import Watchlist from '../models/watchlistModel.js';
import History from '../models/historyModel.js';
import Review from '../models/reviewModel.js';
import { env } from '../config/env.js';
import { fallbackAnime } from './fallbackCatalogueService.js';

/**
 * Creates (or repairs) the administrator account configured through
 * ADMIN_EMAIL / ADMIN_PASSWORD. Safe to run on every boot.
 */
export async function ensureAdminUser(): Promise<{ email: string; created: boolean } | null> {
  if (!env.adminEmail || !env.adminPassword) return null;

  const email = env.adminEmail.toLowerCase();
  let user = await User.findOne({ email }).select('+password');

  if (!user) {
    user = await User.create({
      name: env.adminName,
      email,
      password: env.adminPassword,
      role: 'admin',
    });
    console.log(`[seed] Administrator account created: ${email}`);
    return { email, created: true };
  }

  let changed = false;
  if (user.role !== 'admin') {
    user.role = 'admin';
    changed = true;
  }

  // Keep the configured password usable after a fresh deployment.
  const matches = await user.comparePassword(env.adminPassword);
  if (!matches) {
    user.password = env.adminPassword;
    changed = true;
  }

  if (changed) {
    await user.save();
    console.log(`[seed] Administrator account updated: ${email}`);
  }

  return { email, created: false };
}

const DEMO_EMAIL = 'demo@sayonara.app';
const DEMO_PASSWORD = 'Demo@12345';

/** Creates a demo member with a populated library for screenshots and the viva. */
export async function ensureDemoUser(): Promise<{ email: string; password: string }> {
  let user = await User.findOne({ email: DEMO_EMAIL });

  if (!user) {
    user = await User.create({
      name: 'Demo Otaku',
      email: DEMO_EMAIL,
      password: DEMO_PASSWORD,
      role: 'user',
      bio: 'Sample member created by the demo seed script.',
    });
  }

  const statuses = ['watching', 'completed', 'plan_to_watch', 'on_hold', 'dropped'] as const;
  const sample = fallbackAnime.slice(0, 10);

  for (const [index, anime] of sample.entries()) {
    await Watchlist.findOneAndUpdate(
      { user: user._id, malId: anime.malId },
      {
        $set: {
          title: anime.title,
          image: anime.image,
          year: anime.year,
          score: anime.score,
          type: anime.type,
          genres: anime.genres.map((genre) => genre.name),
          status: statuses[index % statuses.length],
        },
      },
      { upsert: true, setDefaultsOnInsert: true, runValidators: true }
    );

    if (index < 6) {
      await History.findOneAndUpdate(
        { user: user._id, malId: anime.malId },
        {
          $set: {
            title: anime.title,
            image: anime.image,
            episode: (index % 12) + 1,
            progress: 35 + index * 8,
            durationSeconds: ((index % 12) + 1) * 1440,
            lastWatchedAt: new Date(Date.now() - index * 86400000),
          },
        },
        { upsert: true, setDefaultsOnInsert: true, runValidators: true }
      );
    }

    if (index < 5) {
      await Review.findOneAndUpdate(
        { user: user._id, malId: anime.malId },
        {
          $set: {
            animeTitle: anime.title,
            rating: 8 + (index % 3),
            comment:
              'A beautifully animated story with a strong cast and a soundtrack that stays with you.',
          },
        },
        { upsert: true, setDefaultsOnInsert: true, runValidators: true }
      );
    }
  }

  return { email: DEMO_EMAIL, password: DEMO_PASSWORD };
}
