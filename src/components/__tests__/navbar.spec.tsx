import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Navbar from '../Navbar';

describe('Navbar Component', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it('provides an ARIA label for the <nav> element', () => {
    render(<Navbar />);

    expect(screen.getByRole('navigation').getAttribute('aria-label')).toBe('Main');
  });

  it('displays the logo', () => {
    render(<Navbar />);

    expect(screen.getByRole('img').getAttribute('alt')).toBe('DevEvents');
  });

  it('displays the navigation links', () => {
    render(<Navbar />);

    expect(screen.getAllByRole('link')[0].textContent).toBe('DevEvents');
    expect(screen.getAllByRole('link')[1].textContent).toBe('Home');
    expect(screen.getAllByRole('link')[2].textContent).toBe('Events');
    expect(screen.getAllByRole('link')[3].textContent).toBe('Create Event');
  });
});
