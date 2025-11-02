import type { Mongoose } from 'mongoose';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const FAKE_MONGODB_URI =
  'mongodb+srv://user:password@cluster_name.abc123.mongodb.net/?appName=cluster_name';

vi.mock('mongoose', () => ({
  default: {
    connect: vi.fn(),
  },
}));

function createMockMongoose(): Mongoose {
  return {
    connection: {
      readyState: 1,
    },
  } as Mongoose;
}

describe('MongoDB Connection Function', () => {
  beforeEach(async () => {
    vi.resetModules();
    vi.clearAllMocks();

    vi.stubEnv('MONGODB_URI', FAKE_MONGODB_URI);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('throws an error if the MONGODB_URI environment variable is not set', async () => {
    vi.stubEnv('MONGODB_URI', undefined);

    const { default: connectDB } = await import('../mongodb');

    await expect(() => connectDB()).rejects.toThrow(
      'Please set a value for the MONGODB_URI environment variable in the .env file.',
    );
  });

  it('returns the cached connection if one exists', async () => {
    vi.stubGlobal('globalMongoose', {
      conn: {
        connection: {
          close: vi.fn(),
        },
      },
    });

    const { default: connectDB } = await import('../mongodb');

    const result = await connectDB();

    expect(result).toStrictEqual({
      connection: {
        close: expect.any(Function),
      },
    });
  });

  it("sets the cached promise if there's no cached connection and no cached promise", async () => {
    const mockMongoose = createMockMongoose();

    const mongoose = await import('mongoose');

    vi.mocked(mongoose.default.connect).mockResolvedValueOnce(mockMongoose);

    vi.stubGlobal('globalMongoose', {
      conn: null,
      promise: null,
    });

    const { default: connectDB } = await import('../mongodb');

    expect(global.globalMongoose?.promise).toBeNull();

    await connectDB();

    expect(mongoose.default.connect).toHaveBeenCalledWith(FAKE_MONGODB_URI, {
      bufferCommands: false,
    });

    expect(global.globalMongoose?.promise).toStrictEqual(expect.any(Promise));
  });

  it("returns the cached connection if there's no cached connection and no cached promise", async () => {
    const mockMongoose = createMockMongoose();

    const mongoose = await import('mongoose');

    vi.mocked(mongoose.default.connect).mockResolvedValueOnce(mockMongoose);

    vi.stubGlobal('globalMongoose', {
      conn: null,
      promise: null,
    });

    const { default: connectDB } = await import('../mongodb');

    const result = await connectDB();

    expect(result).toBe(mockMongoose);
  });

  it("doesn't set the cached promise if one has already been set and there's no cached connection", async () => {
    const mockMongoose = createMockMongoose();

    const mongoose = await import('mongoose');

    vi.stubGlobal('globalMongoose', {
      conn: null,
      promise: Promise.resolve(mockMongoose),
    });

    const { default: connectDB } = await import('../mongodb');

    const result = await connectDB();

    expect(mongoose.default.connect).not.toHaveBeenCalled();

    expect(result).toBe(mockMongoose);
  });

  it('sets the cached promise to null if an error occurs', async () => {
    const mockError = new Error('Connection failed');

    const mongoose = await import('mongoose');

    vi.mocked(mongoose.default.connect).mockRejectedValueOnce(mockError);

    vi.stubGlobal('globalMongoose', {
      conn: null,
      promise: null,
    });

    const { default: connectDB } = await import('../mongodb');

    const connectPromise = connectDB();

    expect(global.globalMongoose?.promise).toStrictEqual(expect.any(Promise));

    await expect(connectPromise).rejects.toThrow('Connection failed');

    expect(global.globalMongoose?.promise).toBeNull();
  });
});
