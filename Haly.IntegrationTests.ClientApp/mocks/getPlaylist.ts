import { Page } from "@playwright/test";
import { PlaylistWithTracksDto } from "./createFakeDtos";

export async function mockGetPlaylist(page: Page, playlist: PlaylistWithTracksDto) {
    await page.route(`**/Playlists/${playlist.id}*`, async (route, request) => {
        if (request.method() !== "GET") {
            await route.continue();
            return;
        }

        const json = playlist;
        await route.fulfill({ json });
    });
}
