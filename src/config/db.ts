import mongoose, { type ConnectOptions } from 'mongoose';

export interface DatabaseState {
  connectionState: string;
  lastError: string | null;
}

const state: DatabaseState = {
  connectionState: 'disconnected',
  lastError: null,
};

const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

const connectOnce = async (): Promise<void> => {
  const conn = await mongoose.connect(process.env.MONGODB_URI ?? '', {
    serverSelectionTimeoutMS: 10000,
  } as ConnectOptions);
  state.connectionState = 'connected';
  state.lastError = null;
  console.log('MongoDB Connected');

  // Remove a stale unique index left over from an earlier schema iteration
  // (the current model uses `name`, not `username`). Fire-and-forget so it
  // can never block request handling.
  mongoose.connection
    .collection('users')
    .dropIndex('username_1')
    .then(() => console.log('[db] Dropped stale username_1 index'))
    .catch(() => {
      // Index may not exist on a fresh database - that is fine.
    });
};

const connectWithRetry = async (): Promise<boolean> => {
  const maxAttempts = 5;
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      await connectOnce();
      return true;
    } catch (error) {
      state.lastError = error instanceof Error ? error.message : 'Unknown database error';
      state.connectionState = 'connecting';
      console.error(`[db] Connection attempt ${attempt}/${maxAttempts} failed: ${state.lastError}`);
      if (attempt === maxAttempts) return false;
      await sleep(15 * 1000);
    }
  }
  return false;
};

/**
 * Connects to MongoDB Atlas. Retries a few times when asked to (`retry: true`),
 * otherwise fails fast and lets the caller decide how to continue.
 */
export async function connectDatabase(options: { retry?: boolean } = {}): Promise<boolean> {
  if (options.retry) {
    return connectWithRetry();
  }

  try {
    await connectOnce();
    return true;
  } catch (error) {
    state.lastError = error instanceof Error ? error.message : 'Unknown database error';
    console.error(`[db] MongoDB Connection Error: ${state.lastError}`);
    return false;
  }
}

export function databaseState(): DatabaseState {
  return {
    connectionState: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    lastError: state.lastError,
  };
}

export async function disconnectDatabase(): Promise<void> {
  await mongoose.disconnect();
}

const connectDB = async (): Promise<boolean> => connectDatabase();

export default connectDB;
