/// <reference types='vite/client' />
/// <reference types='vitest' />

import { defineConfig as defineViteConfig, mergeConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { defineConfig as defineVitestConfig } from 'vitest/config';

const viteConfig = defineViteConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@app': '/src/app',
      '@entities': '/src/entities',
      '@features': '/src/features',
      '@pages': '/src/pages',
      '@shared': '/src/shared',
      '@widgets': '/src/widgets',
      '@test-utills': '/src/test-utills'
    },
  },
});

const vitestConfig = defineVitestConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/app/setup/setupTests.ts'],
  }
});

// https://vitejs.dev/config/
export default mergeConfig(viteConfig, vitestConfig);
