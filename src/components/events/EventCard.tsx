import Image from 'next/image';
import Link from 'next/link';
import type { EventItem } from '@/types/event-item';

interface EventCardProps {
  event: EventItem;
}

export default function EventCard({ event }: EventCardProps) {
  const { date, image, location, slug, time, title } = event;

  return (
    <Link
      href={`/events/${slug}`}
      className="flex flex-col gap-3"
      aria-labelledby={`event-card-${slug}-title`}
    >
      <Image
        src={image}
        alt={title}
        width={410}
        height={300}
        className="w-full h-[300px] rounded-lg object-cover"
      />

      <div className="flex flex-row gap-2">
        <Image
          src="/icons/pin.svg"
          alt="location"
          aria-hidden="true"
          width={14}
          height={14}
        />

        <p className="text-light-200 text-sm font-light">{location}</p>
      </div>

      <h3
        className="text-[20px] font-semibold line-clamp-1"
        id={`event-card-${slug}-title`}
      >
        {title}
      </h3>

      <div className="text-light-200 flex flex-row flex-wrap items-center gap-4">
        <div className="flex flex-row gap-2">
          <Image
            src="/icons/calendar.svg"
            alt="date"
            aria-hidden="true"
            width={14}
            height={14}
          />

          <p className="text-light-200 text-sm font-light">{date}</p>
        </div>

        <div className="flex flex-row gap-2">
          <Image
            src="/icons/clock.svg"
            alt="time"
            aria-hidden="true"
            width={14}
            height={14}
          />

          <p className="text-light-200 text-sm font-light">{time}</p>
        </div>
      </div>
    </Link>
  );
}
