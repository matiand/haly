import { Page } from "@playwright/test";
import { createFakeUserFeedDto, PrivateUserDto } from "./createFakeDtos";

export async function mockGetMyFeed(page: Page) {
    await page.route("**/Me/feed", async (route) => {
        const json = createFakeUserFeedDto();

        await route.fulfill({ json });
    });
}
