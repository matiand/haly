import { Page } from "@playwright/test";
import { ArtistDetailedDto } from "./createFakeDtos";

export async function mockGetArtistAppearances(page: Page, artist: ArtistDetailedDto) {
    await page.route(`**/Artists/${artist.id}/appearances`, async (route) => {
        const json = {
            albums: [],
            singlesAndEps: [],
            compilations: [],
        };

        await route.fulfill({ json });
    });
}
