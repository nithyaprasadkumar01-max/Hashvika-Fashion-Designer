import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI ?? '';

if (!MONGODB_URI) {
  throw new Error('Please define MONGODB_URI in .env.local');
}

type MongooseCached = {
  conn: typeof mongoose['connection'] | null;
  promise: Promise<typeof mongoose['connection']> | null;
};

declare global {
  // create a single global var to hold cached connection across hot-reloads in dev
  var __mongoose_cached: MongooseCached | undefined;
}

const cached: MongooseCached = global.__mongoose_cached ?? { conn: null, promise: null };

if (!global.__mongoose_cached) {
  global.__mongoose_cached = cached;
}

async function dbConnect(): Promise<typeof mongoose['connection']> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    // mongoose.connect returns Promise<typeof mongoose>, which includes the whole module.
    // We only want the connection object, so map the resolved value to `m.connection`.
    cached.promise = mongoose.connect(MONGODB_URI).then((m) => m.connection);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
