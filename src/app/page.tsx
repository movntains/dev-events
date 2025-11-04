import Image from 'next/image';
import Link from 'next/link';
import EmptyEvents from '@/components/events/EmptyEvents';
import EventCard from '@/components/events/EventCard';
import EventsSorter from '@/components/events/EventsSorter';
import type { GetEventsResponse } from '@/types/api/events';

interface HomePageProps {
  searchParams: Promise<{
    sort?: string;
  }>;
}

export default async function Home({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const sort = params.sort || 'createdAt';

  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/events?sort=${sort}`);
  const data = (await response.json()) as GetEventsResponse;

  if ('error' in data) {
    throw new Error(data.message);
  }

  const { events } = data;

  return (
    <section className="space-y-20">
      <div className="flex flex-col items-center gap-y-7">
        <h1 className="flex flex-col gap-2 text-center">
          <span>The Hub for Every Dev </span>
          <span>Event You Can't Miss</span>
        </h1>

        <p className="text-center">
          Hackathons, meetups, and conferences &mdash; all in one place.
        </p>

        <Link
          href="#events"
          className="flex justify-center items-center gap-2 border border-dark-200 bg-dark-100 w-fit cursor-pointer rounded-full px-8 py-3.5 max-sm:w-full text-center"
        >
          <span>Explore Events</span>

          <Image
            src="/icons/arrow-down.svg"
            alt="arrow-down"
            aria-hidden="true"
            width={25}
            height={24}
          />
        </Link>
      </div>

      <div className="space-y-7">
        <div className="flex flex-col gap-4 md:gap-0 md:flex-row md:justify-between">
          <h2>Featured Events</h2>

          <EventsSorter />
        </div>

        {events.length > 0 && (
          <ul className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <li key={event.title}>
                <EventCard event={event} />
              </li>
            ))}
          </ul>
        )}

        {events.length === 0 && <EmptyEvents />}
      </div>
    </section>
  );
}
