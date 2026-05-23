import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './e2e',
  use: { baseURL: 'http://localhost:3057' },
  webServer: { command: 'npm run dev', url: 'http://localhost:3057', reuseExistingServer: true },
});
