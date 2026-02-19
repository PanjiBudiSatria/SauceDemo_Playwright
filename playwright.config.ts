import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './test',
  retries: 1,

  use: {
    baseURL: 'https://www.saucedemo.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    { name: 'setup', testMatch: /.*\.setup\.ts/ },
    {
      name: 'chromium',
      dependencies: ['setup'],
      use: { storageState: 'storageState.json' },
    },
  ],

  reporter: [['html', { open: 'never' }]],
});
