import { defineConfig, devices } from "@playwright/test";
import "dotenv/config";

/**
 * See https://playwright.dev/docs/test-configuration.
 */

const url = "http://127.0.0.1:5555";

export default defineConfig({
    testDir: "./tests",
    /* Run tests in files in parallel */
    fullyParallel: true,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,
    /* Retry on CI only */
    retries: process.env.CI ? 2 : 0,
    /* Opt out of parallel tests on CI. */
    workers: process.env.CI ? 1 : undefined,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: "html",
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
        /* Base URL to use in actions like `await page.goto('/')`. */
        baseURL: url,

        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: "on-first-retry",
    },

    /* Configure projects for major browsers */
    projects: [
        {
            name: "setup",
            testMatch: /.*\.setup\.ts/,
        },
        {
            name: "chromium",
            use: {
                ...devices["Desktop Chrome"],
                storageState: ".auth/user.json",
            },
            dependencies: ["setup"],
        },
        {
            name: "webkit",
            use: {
                ...devices["Desktop Safari"],
                storageState: ".auth/user.json",
            },
            dependencies: ["setup"],
        },
    ],
    /* Run your local dev server before starting the tests */
    // todo: this will need to be changed for ci
    webServer: {
        command: "npm run start",
        url,
        reuseExistingServer: !process.env.CI,
    },
});
