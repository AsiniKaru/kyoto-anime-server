import { connectDatabase, disconnectDatabase } from '../config/db.js';
import { ensureDemoUser } from '../services/seedService.js';

async function main(): Promise<void> {
  const connection = await connectDatabase();
  if (!connection) {
    console.error('[seed] Could not connect to MongoDB. Check MONGO_URI in backend/.env.');
    process.exit(1);
  }

  const result = await ensureDemoUser();
  console.log(`[seed] Demo member ready: ${result.email} / ${result.password}`);

  await disconnectDatabase();
}

main().catch((error: unknown) => {
  console.error('[seed] Failed:', error);
  process.exit(1);
});
