import mongoose from 'mongoose';
import type { MongooseCache } from '@/types/mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

// Initialize the cache on the global object to persist across hot reloads in development
const cached: MongooseCache = global.globalMongoose || { conn: null, promise: null };

if (!global.globalMongoose) {
  global.globalMongoose = cached;
}

/**
 * Establishes a connection to MongoDB using Mongoose.
 * Caches the connection to prevent multiple connections during development hot reloads.
 *
 * @returns Promise resolving to the Mongoose instance
 */
async function connectDB(): Promise<typeof mongoose> {
  if (!MONGODB_URI) {
    throw new Error(
      'Please set a value for the MONGODB_URI environment variable in the .env file.',
    );
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const options = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, options).then((mongoose) => mongoose);
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;

    throw error;
  }

  return cached.conn;
}

export default connectDB;
