import { defineConfig, devices } from '@playwright/test';
import path from 'path';

const chromeExecutable = path.join(
  process.env.USERPROFILE || 'C:\\Users\\ASUS',
  'AppData\\Local\\ms-playwright\\chromium-1254\\chrome-win64\\chrome.exe'
);

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: 1, // Reliable single-worker execution on local machine
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        launchOptions: {
          executablePath: chromeExecutable,
        },
      },
    },
    {
      name: 'Mobile Chrome',
      use: {
        ...devices['Pixel 5'],
        launchOptions: {
          executablePath: chromeExecutable,
        },
      },
    },
  ],
  webServer: {
    command: 'npm run preview -- --port 3000',
    port: 3000,
    reuseExistingServer: true,
  },
});
