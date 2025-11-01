import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="glass sticky top-0 z-50">
      <nav
        aria-label="Main"
        className="container flex flex-row justify-between mx-auto px-5 py-4 sm:px-10"
      >
        <Link
          href="/"
          className="flex flex-row items-center gap-2"
        >
          <Image
            src="/icons/logo.svg"
            alt="DevEvents"
            width={24}
            height={24}
          />

          <span
            className="text-xl font-bold italic max-sm:hidden"
            aria-hidden="true"
          >
            DevEvents
          </span>
        </Link>

        <ul className="flex flex-row items-center gap-6">
          <li>
            <Link href="/">Home</Link>
          </li>

          <li>
            <Link href="/">Events</Link>
          </li>

          <li>
            <Link href="/">Create Event</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
