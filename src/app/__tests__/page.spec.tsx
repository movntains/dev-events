import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Home from '../page';

describe('Home Page', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it('displays a heading', async () => {
    const HomeResolved = await Home();

    render(HomeResolved);

    expect(screen.getAllByRole('heading')[0].textContent).toBe(
      "The Hub for Every Dev Event You Can't Miss",
    );
  });

  it('displays a featured events section', async () => {
    const HomeResolved = await Home();

    render(HomeResolved);

    expect(screen.getAllByRole('heading')[1].textContent).toBe('Featured Events');
  });
});
