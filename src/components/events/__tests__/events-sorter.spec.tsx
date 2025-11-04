import { fireEvent, render, screen } from '@testing-library/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import EventsSorter from '../EventsSorter';

vi.mock('next/navigation', () => {
  const actual = vi.importActual('next/navigation');

  return {
    ...actual,
    useRouter: vi.fn(),
    useSearchParams: vi.fn(),
  };
});

const mockPush = vi.fn();
const mockURLSearchParams = new URLSearchParams();

describe('Events Sorter Component', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();

    (useRouter as ReturnType<typeof vi.fn>).mockReturnValue({
      push: mockPush,
    });

    (useSearchParams as ReturnType<typeof vi.fn>).mockReturnValue(mockURLSearchParams);
  });

  it('renders the select component with a placeholder', () => {
    render(<EventsSorter />);

    expect(screen.getByText('Sort events by...')).toBeDefined();
  });

  it('renders with an empty value when no sort param exists', () => {
    render(<EventsSorter />);

    expect(screen.getByRole('combobox').textContent).toBe('Sort events by...');
  });

  it('sets the current sort value from valid search params', () => {
    const searchParams = new URLSearchParams('sort=date');

    (useSearchParams as ReturnType<typeof vi.fn>).mockReturnValue(searchParams);

    render(<EventsSorter />);

    expect(screen.getByRole('combobox').textContent).toBe('Event Date');
  });

  it('ignores invalid sort param values', () => {
    const searchParams = new URLSearchParams('sort=invalid');

    (useSearchParams as ReturnType<typeof vi.fn>).mockReturnValue(searchParams);

    render(<EventsSorter />);

    expect(screen.getByText('Sort events by...')).toBeDefined();
  });

  it('updates the URL with the selected sort value', async () => {
    render(<EventsSorter />);

    const trigger = screen.getByRole('combobox');

    fireEvent.click(trigger);

    const option = screen.getByText('Event Title');

    fireEvent.click(option);

    expect(mockPush).toHaveBeenCalledWith('?sort=title#events');
  });

  it('preserves existing query params when updating sort', () => {
    const searchParams = new URLSearchParams('category=tech&search=react');

    (useSearchParams as ReturnType<typeof vi.fn>).mockReturnValue(searchParams);

    render(<EventsSorter />);

    const trigger = screen.getByRole('combobox');

    fireEvent.click(trigger);

    const option = screen.getByText('Date Added');

    fireEvent.click(option);

    expect(mockPush).toHaveBeenCalledWith('?category=tech&search=react&sort=createdAt#events');
  });

  it('has an accessible label for screen readers', () => {
    render(<EventsSorter />);

    expect(screen.getByLabelText('Sort Events By')).toBeDefined();
  });
});
