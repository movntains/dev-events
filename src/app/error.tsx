'use client';

interface ErrorPageProps {
  error: Error & { digest?: string };
}

export default function ErrorPage({ error }: ErrorPageProps) {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[50vh] gap-4">
      <h1 className="text-2xl font-bold">Something went wrong!</h1>
      <p className="text-light-200">{error.message}</p>
    </div>
  );
}
