import { Page } from "@playwright/test";

export async function mockPostJobs(page: Page) {
    await page.route(/Jobs/, async (route) => {
        if (route.request().method() !== "POST") {
            await route.continue();
            return;
        }

        await route.fulfill({ status: 204 });
    });
}
