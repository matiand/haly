import { Page } from "@playwright/test";
import { ArtistDetailedDto, ArtistDiscographyDto, createFakeArtistDiscographyDto } from "./createFakeDtos";

export async function mockGetArtistDiscography(
    page: Page,
    artist: ArtistDetailedDto,
    discography: ArtistDiscographyDto,
) {
    await page.route(`**/Artists/${artist.id}/discography`, async (route) => {
        await route.fulfill({ json: discography });
    });
}
