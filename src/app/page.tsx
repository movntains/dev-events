import Image from 'next/image';
import Link from 'next/link';
import EventCard from '@/components/EventCard';
import { events } from '@/lib/constants';

export default function Home() {
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
        <h2>Featured Events</h2>

        <ul className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <li key={event.title}>
              <EventCard event={event} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
