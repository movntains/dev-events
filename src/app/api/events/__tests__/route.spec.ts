import type { NextRequest } from 'next/server';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { events } from '@/lib/constants';
import { GET, POST } from '../route';

vi.mock('@/lib/mongodb');
vi.mock('@/lib/cloudinary');
vi.mock('@/models/Event', () => ({
  default: {
    find: vi.fn(),
    create: vi.fn(),
  },
}));

const mockConnectDB = vi.fn();
const mockUploadFileToCloudinary = vi.fn();
const mockEventFind = vi.fn();
const mockEventSort = vi.fn();
const mockEventCreate = vi.fn();

describe('Events API Routes', () => {
  beforeEach(async () => {
    vi.resetModules();
    vi.clearAllMocks();

    vi.mocked(await import('@/lib/mongodb')).default = mockConnectDB;
    vi.mocked(await import('@/lib/cloudinary')).uploadFileToCloudinary = mockUploadFileToCloudinary;

    const EventModel = (await import('@/models/Event')).default;

    EventModel.find = mockEventFind;
    EventModel.create = mockEventCreate;
  });

  describe('GET Route', () => {
    it('returns all events and sorts by "createdAt" by default', async () => {
      const mockRequest = {
        nextUrl: {
          searchParams: {
            get: vi.fn(),
          },
        },
      } as unknown as NextRequest;

      const mockEvents = events;

      mockEventFind.mockReturnValueOnce({
        sort: mockEventSort.mockResolvedValueOnce(mockEvents),
      });

      const response = await GET(mockRequest);
      const data = await response.json();

      expect(mockConnectDB).toHaveBeenCalled();
      expect(mockEventFind).toHaveBeenCalled();
      expect(mockEventSort).toHaveBeenCalledWith({ createdAt: 'desc' });

      expect(response.status).toBe(200);
      expect(data.message).toBe('Events fetched successfully.');
      expect(data.events).toEqual(mockEvents);
    });

    it('sorts events by the given "sort" parameter', async () => {
      const mockRequest = {
        nextUrl: {
          searchParams: {
            get: vi.fn().mockReturnValueOnce('title'),
          },
        },
      } as unknown as NextRequest;

      const mockEvents = events;

      mockEventFind.mockReturnValueOnce({
        sort: mockEventSort.mockResolvedValueOnce(mockEvents),
      });

      const response = await GET(mockRequest);
      const data = await response.json();

      expect(mockConnectDB).toHaveBeenCalled();
      expect(mockEventFind).toHaveBeenCalled();
      expect(mockEventSort).toHaveBeenCalledWith({ title: 'asc' });

      expect(response.status).toBe(200);
      expect(data.message).toBe('Events fetched successfully.');
      expect(data.events).toEqual(mockEvents);
    });

    it('sorts events by "createdAt" if an invalid sort parameter is provided', async () => {
      const mockRequest = {
        nextUrl: {
          searchParams: {
            get: vi.fn().mockReturnValueOnce('invalid'),
          },
        },
      } as unknown as NextRequest;

      const mockEvents = events;

      mockEventFind.mockReturnValueOnce({
        sort: mockEventSort.mockResolvedValueOnce(mockEvents),
      });

      const response = await GET(mockRequest);
      const data = await response.json();

      expect(mockConnectDB).toHaveBeenCalled();
      expect(mockEventFind).toHaveBeenCalled();
      expect(mockEventSort).toHaveBeenCalledWith({ createdAt: 'desc' });

      expect(response.status).toBe(200);
      expect(data.message).toBe('Events fetched successfully.');
      expect(data.events).toEqual(mockEvents);
    });

    it('handles errors when fetching all events', async () => {
      const mockRequest = {
        nextUrl: {
          searchParams: {
            get: vi.fn(),
          },
        },
      } as unknown as NextRequest;

      mockEventFind.mockReturnValueOnce({
        sort: vi.fn().mockRejectedValueOnce(new Error('DB Error')),
      });

      const response = await GET(mockRequest);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.message).toBe('Event fetching failed.');
      expect(data.error).toBe('DB Error');
    });

    it('returns an error of "Unknown" if the error is not an instance of Error', async () => {
      const mockRequest = {
        nextUrl: {
          searchParams: {
            get: vi.fn(),
          },
        },
      } as unknown as NextRequest;

      mockEventFind.mockReturnValueOnce({
        sort: vi.fn().mockRejectedValueOnce('Failed'),
      });

      const response = await GET(mockRequest);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.message).toBe('Event fetching failed.');
      expect(data.error).toBe('Unknown');
    });
  });

  describe('POST Route', () => {
    it('creates an event', async () => {
      const mockFile = new File(['image'], 'test.jpg', { type: 'image/jpeg' });
      const formData = new FormData();

      mockFile.arrayBuffer = vi.fn().mockResolvedValueOnce(new ArrayBuffer(8));

      formData.append('title', 'Test Event');
      formData.append('image', mockFile);

      const mockRequest = {
        formData: vi.fn().mockResolvedValueOnce(formData),
      } as unknown as NextRequest;

      mockUploadFileToCloudinary.mockResolvedValueOnce({
        secure_url: 'https://cloudinary.com/image.jpg',
      });

      mockEventCreate.mockResolvedValueOnce({
        _id: '1',
        title: 'Test Event',
        image: 'https://cloudinary.com/image.jpg',
      });

      const response = await POST(mockRequest);
      const data = await response.json();

      expect(mockConnectDB).toHaveBeenCalled();
      expect(mockUploadFileToCloudinary).toHaveBeenCalled();
      expect(mockEventCreate).toHaveBeenCalled();

      expect(response.status).toBe(201);
      expect(data.message).toBe('Event created successfully.');
    });

    it('returns an error response if the form data cannot be parsed', async () => {
      const formData = {
        entries: vi.fn().mockImplementationOnce(() => {
          throw new Error('Invalid format');
        }),
        get: vi.fn(),
      };

      const mockRequest = {
        formData: vi.fn().mockResolvedValueOnce(formData),
      } as unknown as NextRequest;

      const response = await POST(mockRequest);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.message).toBe('Invalid JSON data format.');
    });

    it('returns an error response if no image file is provided', async () => {
      const formData = new FormData();

      formData.append('title', 'Test Event');

      const mockRequest = {
        formData: vi.fn().mockResolvedValueOnce(formData),
      } as unknown as NextRequest;

      const response = await POST(mockRequest);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.message).toBe('Image file is required.');
    });

    it('handles errors when creating a new event', async () => {
      const mockFile = new File(['image'], 'test.jpg', { type: 'image/jpeg' });
      const formData = new FormData();

      mockFile.arrayBuffer = vi.fn().mockResolvedValueOnce(new ArrayBuffer(8));

      formData.append('title', 'Test Event');
      formData.append('image', mockFile);

      const mockRequest = {
        formData: vi.fn().mockResolvedValueOnce(formData),
      } as unknown as NextRequest;

      mockUploadFileToCloudinary.mockRejectedValueOnce(new Error('Upload failed'));

      const response = await POST(mockRequest);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.message).toBe('Event creation failed');
      expect(data.error).toBe('Upload failed');
    });

    it('returns an error of "Unknown" if the error is not an instance of Error', async () => {
      const mockFile = new File(['image'], 'test.jpg', { type: 'image/jpeg' });
      const formData = new FormData();

      mockFile.arrayBuffer = vi.fn().mockResolvedValueOnce(new ArrayBuffer(8));

      formData.append('title', 'Test Event');
      formData.append('image', mockFile);

      const mockRequest = {
        formData: vi.fn().mockResolvedValueOnce(formData),
      } as unknown as NextRequest;

      mockUploadFileToCloudinary.mockRejectedValueOnce('Failed');

      const response = await POST(mockRequest);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.message).toBe('Event creation failed');
      expect(data.error).toBe('Unknown');
    });
  });
});
