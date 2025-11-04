'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const VALID_SORT_VALUES = ['createdAt', 'date', 'title'];

export default function EventsSorter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sortParam = searchParams.get('sort');
  const currentSort = sortParam && VALID_SORT_VALUES.includes(sortParam) ? sortParam : '';

  const handleSortChange = (value: string): void => {
    const params = new URLSearchParams(searchParams.toString());

    params.set('sort', value);

    router.push(`?${params.toString()}#events`);
  };

  return (
    <Select
      value={currentSort}
      onValueChange={handleSortChange}
    >
      <label
        htmlFor="events-sort"
        className="sr-only"
      >
        Sort Events By
      </label>

      <SelectTrigger id="events-sort">
        <SelectValue placeholder="Sort events by..." />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="createdAt">Date Added</SelectItem>
        <SelectItem value="date">Event Date</SelectItem>
        <SelectItem value="title">Event Title</SelectItem>
      </SelectContent>
    </Select>
  );
}
