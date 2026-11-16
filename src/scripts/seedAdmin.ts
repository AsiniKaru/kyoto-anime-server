import { connectDatabase, disconnectDatabase } from '../config/db.js';
import { ensureAdminUser } from '../services/seedService.js';

async function main(): Promise<void> {
  const connection = await connectDatabase();
  if (!connection) {
    console.error('[seed] Could not connect to MongoDB. Check MONGO_URI in backend/.env.');
    process.exit(1);
  }

  const result = await ensureAdminUser();
  if (!result) {
    console.error('[seed] Set ADMIN_EMAIL and ADMIN_PASSWORD in backend/.env first.');
  } else {
    console.log(`[seed] Administrator ready: ${result.email}`);
  }

  await disconnectDatabase();
}

main().catch((error: unknown) => {
  console.error('[seed] Failed:', error);
  process.exit(1);
});
