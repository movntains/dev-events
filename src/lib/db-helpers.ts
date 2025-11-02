const TIME_REGEX = /^(\d{1,2}):(\d{2})(\s*(AM|PM))?$/i;

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export function normalizeDate(dateString: string): string {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    throw new Error('Invalid date format');
  }

  return date.toISOString().split('T')[0];
}

export function normalizeTime(timeString: string): string {
  const match = timeString.trim().match(TIME_REGEX);

  if (!match) {
    throw new Error('Invalid time format. Use HH:MM or HH:MM AM/PM');
  }

  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const period = match[4]?.toUpperCase();

  if (period) {
    if (period === 'PM' && hours !== 12) {
      hours += 12;
    }

    if (period === 'AM' && hours === 12) {
      hours = 0;
    }
  }

  if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
    throw new Error('Invalid time values');
  }

  return `${hours.toString().padStart(2, '0')}:${minutes}`;
}
