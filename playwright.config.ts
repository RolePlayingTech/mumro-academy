import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  timeout: 30_000,
  use: {
    baseURL: 'http://127.0.0.1:4326',
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'npm run preview',
    url: 'http://127.0.0.1:4326/',
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
