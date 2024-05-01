import { Page } from "@playwright/test";
import { PlaylistWithTracksDto } from "./createFakeDtos";

export async function mockGetPlaylistTracks(page: Page, playlist: PlaylistWithTracksDto) {
    await page.route(/.*Playlists.*tracks.*/, async (route, request) => {
        if (request.method() !== "GET") {
            await route.continue();
            return;
        }

        const json = {
            page: playlist.tracks,
            totalDuration: playlist.totalDuration,
        };
        await route.fulfill({ json });
    });
}
