import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import EmptyEvents from '../EmptyEvents';

describe('Empty Events Component', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it('displays a title', () => {
    render(<EmptyEvents />);

    expect(screen.getByText('No Featured Events')).toBeDefined();
  });
});
