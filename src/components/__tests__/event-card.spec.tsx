import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { EventItem } from '@/types/event-item';
import EventCard from '../EventCard';

const event: EventItem = {
  image: '/images/event.png',
  title: 'React Summit US 2025',
  slug: 'react-summit-us-2025',
  location: 'San Francisco, CA, USA',
  date: '2025-11-07',
  time: '09:00 AM',
};

describe('Event Card Component', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it('displays the event information', () => {
    render(<EventCard event={event} />);

    expect(screen.getAllByRole('img')[0].getAttribute('alt')).toBe(event.title);
    expect(screen.getAllByRole('paragraph')[0].textContent).toBe(event.location);
    expect(screen.getAllByRole('paragraph')[1].textContent).toBe(event.title);
    expect(screen.getAllByRole('paragraph')[2].textContent).toBe(event.date);
    expect(screen.getAllByRole('paragraph')[3].textContent).toBe(event.time);
  });
});
