import type mongoose from 'mongoose';

export type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  var globalMongoose: MongooseCache | undefined;
}
