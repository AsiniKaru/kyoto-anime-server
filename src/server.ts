import app from './index.js';
import { env } from './config/env.js';
import { connectDatabase, databaseState, disconnectDatabase } from './config/db.js';
import { ensureAdminUser } from './services/seedService.js';

async function bootstrap() {
  // Start listening first so /api/health and public anime routes work even when
  // MongoDB is not running. The database connects (and reconnects) in the background.
  const server = app.listen(env.port, () => {
    console.log('----------------------------------------------------');
    console.log(`  SayonaraAnime API running on http://localhost:${env.port}`);
    console.log(`  Environment : ${env.nodeEnv}`);
    console.log(`  Health check: http://localhost:${env.port}/api/health`);
    console.log('----------------------------------------------------');
  });

  server.on('error', (error: NodeJS.ErrnoException) => {
    if (error.code === 'EADDRINUSE') {
      console.error(`[server] Port ${env.port} is already in use. Stop the other process or set PORT in backend/.env.`);
      process.exit(1);
    }
    console.error('[server] Failed to start:', error.message);
    process.exit(1);
  });

  const connection = await connectDatabase({ retry: true });
  if (!connection) {
    console.warn('');
    console.warn('[db] MongoDB is NOT connected. The API is still running, so browsing anime works.');
    console.warn('[db] Registering, logging in and saving lists/reviews need MongoDB:');
    console.warn(`[db]   1. Start MongoDB locally (expected at ${env.mongoUri}), or`);
    console.warn('[db]   2. Set MONGO_URI in backend/.env to a MongoDB Atlas connection string.');
    console.warn('[db] The server will keep retrying every 15 seconds — no restart needed.');
    console.warn('');
  } else {
    // Idempotent: creates the admin account only when ADMIN_EMAIL/PASSWORD are set.
    await ensureAdminUser().catch((error: unknown) => {
      console.error('[seed] Could not prepare the administrator account:', error);
    });
    // Drop stale indexes left over from previous schema versions (e.g. tmdbId).
    try {
      const { default: User } = await import('./models/userModel.js');
      const { default: Watchlist } = await import('./models/watchlistModel.js');
      const { default: History } = await import('./models/historyModel.js');
      const { default: Review } = await import('./models/reviewModel.js');
      const { default: RefreshToken } = await import('./models/refreshTokenModel.js');
      await Promise.all([
        User.syncIndexes(),
        Watchlist.syncIndexes(),
        History.syncIndexes(),
        Review.syncIndexes(),
        RefreshToken.syncIndexes(),
      ]);
      console.log('[db] Indexes synced.');
    } catch (error) {
      console.warn('[db] Could not sync indexes:', error);
    }
  }

  const shutdown = async (signal: string) => {
    console.log(`\n[server] ${signal} received, shutting down gracefully...`);
    server.close(async () => {
      await disconnectDatabase().catch(() => {});
      process.exit(0);
    });
    setTimeout(() => process.exit(1), 10000).unref();
  };

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));

  process.on('unhandledRejection', (reason) => {
    console.error('[server] Unhandled rejection:', reason);
  });

  // Expose a tiny startup snapshot for debugging
  process.on('exit', () => {
    const state = databaseState();
    if (state.lastError) console.error('[db] Last database error:', state.lastError);
  });
}

bootstrap();
