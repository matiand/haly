import { Page } from "@playwright/test";

export async function mockPutMyLikedSongs(page: Page) {
    await page.route("**/Me/tracks", async (route) => {
        if (route.request().method() !== "PUT") {
            await route.continue();
            return;
        }

        await route.fulfill({ status: 204 });
    });
}
