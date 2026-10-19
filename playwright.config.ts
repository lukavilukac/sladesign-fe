import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests/e2e',
    timeout: 60000,
    expect: { timeout: 15000 },
    workers: 1,
    retries: 0,
    reporter: [['list'], ['html', { open: 'never' }]],
    use: { baseURL: 'http://127.0.0.1:3100', trace: 'retain-on-failure', actionTimeout: 10000 },
    webServer: [
        { command: 'node tests/fixtures/api.mjs', url: 'http://127.0.0.1:4010/api/categories' },
        {
            command: 'npm run dev -- --hostname 127.0.0.1 --port 3100',
            url: 'http://127.0.0.1:3100',
            timeout: 180000,
            env: { API_BASE_URL: 'http://127.0.0.1:4010/api', NEXT_DIST_DIR: '.next-e2e' }
        }
    ],
    projects: [
        { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
        { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
        { name: 'webkit', use: { ...devices['Desktop Safari'] } },
        { name: 'mobile-webkit', use: { ...devices['iPhone 13'] } }
    ]
});
