import react from '@vitejs/plugin-react';
import tsConfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [tsConfigPaths(), react()],
  test: {
    environment: 'jsdom',
    globals: true,
    coverage: {
      enabled: true,
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/app/layout.tsx', 'src/components/ui/*', 'src/types/*'],
      reporter: ['text', 'json'],
    },
  },
});
