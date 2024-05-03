import { Page } from "@playwright/test";
import { AlbumDetailedDto } from "./createFakeDtos";

export async function mockGetAlbum(page: Page, album: AlbumDetailedDto) {
    await page.route(`**/Albums/${album.id}`, async (route) => {
        const json = album;
        await route.fulfill({ json });
    });
}
