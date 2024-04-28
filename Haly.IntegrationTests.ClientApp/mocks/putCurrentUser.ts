import { Page } from "@playwright/test";
import { PrivateUserDto } from "./createFakeDtos";

export async function mockPutCurrentUser(page: Page, user: PrivateUserDto) {
    await page.route("**/Me", async (route) => {
        const json = user;

        await route.fulfill({ json });
    });
}
