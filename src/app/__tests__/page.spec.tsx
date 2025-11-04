import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { events } from '@/lib/constants';
import Home from '../page';

const FAKE_BASE_URL = 'http://localhost:3000';

vi.stubEnv('NEXT_PUBLIC_BASE_URL', FAKE_BASE_URL);

global.fetch = vi.fn();

vi.mock('next/navigation', () => {
  const actual = vi.importActual('next/navigation');

  return {
    ...actual,
    useRouter: () => ({
      push: vi.fn(),
    }),
    useSearchParams: () => ({
      get: vi.fn(),
    }),
  };
});

describe('Home Page', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it('displays a heading', async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      json: async () => ({ events: [] }),
    });

    const searchParams = Promise.resolve({ sort: '' });
    const HomeResolved = await Home({ searchParams });

    render(HomeResolved);

    expect(screen.getAllByRole('heading')[0].textContent).toBe(
      "The Hub for Every Dev Event You Can't Miss",
    );
  });

  it('displays a featured events section', async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      json: async () => ({ events: [] }),
    });

    const searchParams = Promise.resolve({ sort: '' });
    const HomeResolved = await Home({ searchParams });

    render(HomeResolved);

    expect(screen.getAllByRole('heading')[1].textContent).toBe('Featured Events');
  });

  it('fetches events with the default sort parameter if none is provided', async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      json: async () => ({ events: [] }),
    });

    const searchParams = Promise.resolve({});

    await Home({ searchParams });

    expect(global.fetch).toHaveBeenCalledWith(`${FAKE_BASE_URL}/api/events?sort=createdAt`);
  });

  it('fetches events with a custom sort parameter if one is provided', async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      json: async () => ({ events: [] }),
    });

    const searchParams = Promise.resolve({ sort: 'title' });

    await Home({ searchParams });

    expect(global.fetch).toHaveBeenCalledWith(`${FAKE_BASE_URL}/api/events?sort=title`);
  });

  it('throws an error when the API returns an error response', async () => {
    const error = new Error('Something went wrong');

    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      json: async () => ({
        error: error.message,
        message: 'Event fetching failed.',
      }),
    });

    const searchParams = Promise.resolve({ sort: 'createdAt' });

    await expect(Home({ searchParams })).rejects.toThrow('Event fetching failed.');
  });

  it('renders event cards when events are returned', async () => {
    const mockEvents = events;

    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      json: async () => ({ events: mockEvents }),
    });

    const searchParams = Promise.resolve({ sort: 'createdAt' });
    const HomeResolved = await Home({ searchParams });

    render(HomeResolved);

    expect(screen.getByText(events[0].title)).toBeDefined();
    expect(screen.getByText(events[1].title)).toBeDefined();
  });

  it('displays empty state when no events are returned', async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      json: async () => ({ events: [] }),
    });

    const searchParams = Promise.resolve({ sort: 'createdAt' });
    const HomeResolved = await Home({ searchParams });

    render(HomeResolved);

    expect(screen.queryByText(events[0].title)).toBeNull();
    expect(screen.getByText('No Featured Events')).toBeDefined();
  });
});
