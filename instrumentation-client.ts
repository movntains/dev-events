import posthog from 'posthog-js';

posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY ?? '', {
  api_host: '/ingest',
  ui_host: 'https://us.posthog.com',
  defaults: '2025-05-24',
  // This enables capturing exceptions using Error Tracking; set to false if not wanted
  capture_exceptions: true,
  debug: process.env.NODE_ENV === 'development',
});
