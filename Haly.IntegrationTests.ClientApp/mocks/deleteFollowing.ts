import { Page } from "@playwright/test";

export async function mockDeleteFollowing(page: Page) {
    await page.route(/.*Me\/Following.*/, async (route) => {
        if (route.request().method() !== "DELETE") {
            await route.continue();
            return;
        }

        await route.fulfill({ status: 204 });
    });
}
