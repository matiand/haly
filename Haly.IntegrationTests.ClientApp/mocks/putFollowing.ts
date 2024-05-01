import { Page } from "@playwright/test";

export async function mockPutFollowing(page: Page) {
    await page.route(/.*Me\/Following.*/, async (route) => {
        if (route.request().method() !== "PUT") {
            await route.continue();
            return;
        }

        await route.fulfill({ status: 204 });
    });
}
