import { Page } from "@playwright/test";
import { createFakePlaylistBriefDto, PrivateUserDto } from "./createFakeDtos";
import { faker } from "@faker-js/faker";

export async function mockPutMyPlaylists(page: Page, user: PrivateUserDto) {
    await page.route("**/Me/playlists", async (route) => {
        if (route.request().method() !== "PUT") {
            await route.continue();
            return;
        }

        const json = faker.helpers.multiple(() => createFakePlaylistBriefDto(user), { count: 25 });
        await route.fulfill({ json });
    });
}
