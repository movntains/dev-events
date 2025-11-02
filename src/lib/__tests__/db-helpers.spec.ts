import { beforeEach, describe, expect, it, vi } from 'vitest';
import { generateSlug, normalizeDate, normalizeTime } from '../db-helpers';

describe('Database Helper Functions', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it('generates a slug from an event title', () => {
    const titleWithSpecialCharacters = "What's Next in Dev?";
    const titleWithMultipleHyphens = 'GitHub Universe -- 2025';
    const titleWithLeadingAndTrailingHyphens = '-GitHub Universe -- 2025 --';

    expect(generateSlug(titleWithSpecialCharacters)).toBe('whats-next-in-dev');
    expect(generateSlug(titleWithMultipleHyphens)).toBe('github-universe-2025');
    expect(generateSlug(titleWithLeadingAndTrailingHyphens)).toBe('github-universe-2025');
  });

  it('normalizes a date to YYYY-MM-DD format', () => {
    expect(normalizeDate('2025-11-02T04:30:00.000Z')).toBe('2025-11-02');
    expect(normalizeDate('11/2/2025')).toBe('2025-11-02');
  });

  it('throws an error when normalizing a date if an invalid format is received', () => {
    expect(() => normalizeDate('not a date')).toThrow('Invalid date format');
  });

  it('normalizes a time to HH:MM 24-hour format', () => {
    expect(normalizeTime('1:30 pm')).toBe('13:30');
    expect(normalizeTime('7:00 AM')).toBe('07:00');
    expect(normalizeTime('12:00 am')).toBe('00:00');
    expect(normalizeTime('12:00 pm')).toBe('12:00');
  });

  it('throws an error when normalizing a time if an invalid format is received', () => {
    expect(() => normalizeTime('12:30:30')).toThrow(
      'Invalid time format. Use HH:MM or HH:MM AM/PM.',
    );

    expect(() => normalizeTime('12:00 noon')).toThrow(
      'Invalid time format. Use HH:MM or HH:MM AM/PM.',
    );
  });

  it('throws an error when normalizing a time if an invalid values are received', () => {
    expect(() => normalizeTime('25:15')).toThrow('Invalid time values');

    expect(() => normalizeTime('1:62')).toThrow('Invalid time values');
  });
});
