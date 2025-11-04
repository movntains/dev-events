import type { UploadApiResponse } from 'cloudinary';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { uploadFileToCloudinary } from '../cloudinary';

vi.mock('cloudinary', () => ({
  v2: {
    uploader: {
      upload_stream: vi.fn(),
    },
  },
}));

const mockBuffer = Buffer.from('test file content');
const mockOptions = {
  buffer: mockBuffer,
  resourceType: 'image' as const,
  uploadPreset: 'test_preset',
};

describe('Cloudinary Helper Functions', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it('uploads a file to Cloudinary', async () => {
    const mockResponse: Partial<UploadApiResponse> = {
      public_id: 'test_id',
      secure_url: 'https://cloudinary.com/test.jpg',
    };
    const mockEnd = vi.fn();

    const { v2: cloudinary } = await import('cloudinary');

    const mockUploadStream = vi.fn().mockImplementation((_, callback) => {
      callback(null, mockResponse);

      return {
        end: mockEnd,
      };
    });

    cloudinary.uploader.upload_stream = mockUploadStream;

    const result = await uploadFileToCloudinary(mockOptions);

    expect(mockUploadStream).toHaveBeenCalledWith(
      {
        resource_type: 'image',
        upload_preset: 'test_preset',
      },
      expect.any(Function),
    );

    expect(result).toEqual(mockResponse);

    expect(mockEnd).toHaveBeenCalledWith(mockBuffer);
  });

  it('handles a failed upload', async () => {
    const mockError = new Error('Upload failed');
    const mockEnd = vi.fn();

    const { v2: cloudinary } = await import('cloudinary');

    const mockUploadStream = vi.fn().mockImplementation((_, callback) => {
      callback(mockError, null);

      return {
        end: mockEnd,
      };
    });

    cloudinary.uploader.upload_stream = mockUploadStream;

    await expect(uploadFileToCloudinary(mockOptions)).rejects.toThrow('Upload failed');

    expect(mockEnd).toHaveBeenCalledWith(mockBuffer);
  });
});
