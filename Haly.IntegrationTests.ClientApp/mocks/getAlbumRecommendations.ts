import { Page } from "@playwright/test";
import { AlbumDetailedDto, ReleaseItemDto } from "./createFakeDtos";

export async function mockGetAlbumRecommendations(
    page: Page,
    album: AlbumDetailedDto,
    recommendations: ReleaseItemDto[],
) {
    await page.route(`**/Albums/${album.id}/recommendations*`, async (route) => {
        const json = recommendations;
        await route.fulfill({ json });
    });
}
