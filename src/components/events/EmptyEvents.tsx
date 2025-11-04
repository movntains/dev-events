import { CalendarOff } from 'lucide-react';
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '../ui/empty';

export default function EmptyEvents() {
  return (
    <Empty className="border border-dashed border-dark-200">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <CalendarOff />
        </EmptyMedia>

        <EmptyTitle>No Featured Events</EmptyTitle>

        <EmptyDescription>
          No featured events have been added yet. Please check back later!
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
