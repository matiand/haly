import { Page } from "@playwright/test";
import { ArtistDetailedDto } from "./createFakeDtos";

export async function mockGetArtist(page: Page, artist: ArtistDetailedDto) {
    await page.route(`**/Artists/${artist.id}`, async (route) => {
        const json = artist;
        await route.fulfill({ json });
    });
}
