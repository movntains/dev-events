import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import ErrorPage from '../error';

describe('Error Page', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it('renders an error heading', () => {
    const error = new Error('Test error message');

    render(<ErrorPage error={error} />);

    expect(screen.getByRole('heading').textContent).toBe('Something went wrong!');
  });

  it('displays the error message', () => {
    const error = new Error('Test error message');

    render(<ErrorPage error={error} />);

    expect(screen.getByRole('paragraph').textContent).toBe('Test error message');
  });

  it('handles an error with the "digest" property', () => {
    const error = Object.assign(new Error('Error with digest'), { digest: 'abc123' });

    render(<ErrorPage error={error} />);

    expect(screen.getByRole('paragraph').textContent).toBe('Error with digest');
  });
});
