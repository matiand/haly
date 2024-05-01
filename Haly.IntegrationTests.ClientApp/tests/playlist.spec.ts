import { expect, Locator, test as base } from "@playwright/test";
import {
    createFakePlaylistWithTracksDto,
    createFakePrivateUserDto,
    PlaylistWithTracksDto,
} from "../mocks/createFakeDtos";
import { mockPutCurrentUser } from "../mocks/putCurrentUser";
import { mockPutMyLikedSongs } from "../mocks/putMyLikedSongs";
import { mockPutMyPlaylists } from "../mocks/putMyPlaylists";
import { mockPostJobs } from "../mocks/postJobs";
import { mockGetPlaylist } from "../mocks/getPlaylist";
import { mockGetPlaylistTracks } from "../mocks/getPlaylistTracks";
import { mockPutPlaylist } from "../mocks/putPlaylist";
import { mockPutFollowing } from "../mocks/putFollowing";
import { mockDeleteFollowing } from "../mocks/deleteFollowing";

type PlaylistSpec = {
    playlist: PlaylistWithTracksDto;
};

const test = base.extend<PlaylistSpec>({
    playlist: createFakePlaylistWithTracksDto(),
});

test.beforeEach(async ({ page, playlist }) => {
    const currentUser = createFakePrivateUserDto();

    await mockPutCurrentUser(page, currentUser);
    await mockPutMyLikedSongs(page);
    await mockPutMyPlaylists(page, currentUser);
    await mockPostJobs(page);

    await mockGetPlaylist(page, playlist);
    await mockPutPlaylist(page, playlist);
    await mockGetPlaylistTracks(page, playlist);

    await mockPutFollowing(page);
    await mockDeleteFollowing(page);

    await page.goto(`/playlist/${playlist.id}`);
});

test("title contains playlist and owner name", async ({ page, playlist }) => {
    await expect(page).toHaveTitle(`${playlist.name} by ${playlist.owner.name}`);
});

test("page contains information about the playlist", async ({ page, playlist }) => {
    await test.step("playlist name", async () => {
        await expect(
            page.getByRole("heading", {
                name: playlist.name,
                exact: true,
            }),
        ).toBeVisible();
    });

    await test.step("playlist owner", async () => {
        await expect(
            page.getByRole("link", {
                name: playlist.owner.name,
                exact: true,
            }),
        ).toBeVisible();
    });

    await test.step("duration", async () => {
        await expect(page.getByText(playlist.totalDuration)).toBeVisible();
    });

    await test.step("number of tracks", async () => {
        await expect(page.getByText(`${playlist.tracks.total} songs`)).toBeVisible();
    });
});

test("shows a header menu with playlist name visible, when some scrolling threshold is reached", async ({ page }) => {
    const menuTitle = page.getByTestId("upper-menu-title");
    const lastTrack = page.locator("tbody > tr").last();

    await expect(menuTitle).not.toBeVisible();

    await selectTrackRow(lastTrack);

    await expect(menuTitle).toBeInViewport();
});

test("table's head is still visible, when scrolling to the bottom of the page", async ({ page, playlist }) => {
    const tracksTable = page.getByRole("table");
    const lastTrack = page.locator("tbody > tr").last();

    await expect(tracksTable.locator("thead")).toBeInViewport();

    await selectTrackRow(lastTrack);

    await expect(tracksTable.locator("thead")).toBeInViewport();
});

test("allows the user to select a track by clicking on it", async ({ page }) => {
    const tracks = page.locator("tbody > tr");

    await test.step("single click", async () => {
        await selectTrackRow(tracks.nth(0));

        await expect(tracks.nth(0)).toHaveClass(/selected/i);
    });

    await test.step("click with ctrl modifier", async () => {
        await selectTrackRow(tracks.nth(2), ["Control"]);

        await expect(tracks.nth(1)).not.toHaveClass(/selected/i);
        await expect(tracks.nth(2)).toHaveClass(/selected/i);
    });

    await test.step("click with shift modifier", async () => {
        await selectTrackRow(tracks.nth(4), ["Shift"]);

        await expect(tracks.nth(3)).toHaveClass(/selected/i);
        await expect(tracks.nth(4)).toHaveClass(/selected/i);
    });
});

test("allows opening a context menu with additional options", async ({ page, playlist }) => {
    await test.step("when right clicking on a playlist name heading", async () => {
        const heading = page.getByRole("heading", { name: playlist.name });
        await heading.click({ button: "right" });

        await expect(page.getByRole("menuitem", { name: "Share" })).toBeVisible();

        await page.getByRole("menu").press("Escape");
    });

    await test.step("when right clicking on a playlist image", async () => {
        await expect(page.getByRole("menuitem", { name: "Share" })).not.toBeVisible();

        const image = page.getByRole("button", { name: "playlist image" });
        await image.click({ button: "right" });

        await expect(page.getByRole("menuitem", { name: "Share" })).toBeVisible();

        await page.getByRole("menu").press("Escape");
    });

    await test.step("when clicking on a more options button", async () => {
        await expect(page.getByRole("menuitem", { name: "Share" })).not.toBeVisible();

        const button = page.getByRole("button", { name: "More options for playlist" });
        await button.click();

        await expect(page.getByRole("menuitem", { name: "Share" })).toBeVisible();

        await page.getByRole("menu").press("Escape");
    });

    await test.step("when right clicking on a sidebar playlist item", async () => {
        await expect(page.getByRole("menuitem", { name: "Share" })).not.toBeVisible();

        const item = page.getByTestId("library-item-playlist").first();
        await item.click({ button: "right" });

        await expect(page.getByRole("menuitem", { name: "Share" })).toBeVisible();

        await page.getByRole("menu").press("Escape");
    });

    await test.step("when clicking on track's more options button", async () => {
        await expect(page.getByRole("menuitem", { name: "Share" })).not.toBeVisible();

        const firstTrack = page.locator("tbody > tr").first();
        await selectTrackRow(firstTrack);
        await firstTrack.getByRole("button", { name: /more options/i }).click();

        await expect(page.getByRole("menuitem", { name: "Liked Songs" })).toBeVisible();
    });
});

test("shows a modal for some playlist operations", async ({ page }) => {
    await test.step("'Edit details' modal, when playlist is in our library", async () => {
        const item = page.getByTestId("library-item-playlist").first();
        await item.click({ button: "right" });

        await page.getByRole("menuitem", { name: "Edit details" }).click();
        await expect(page.getByRole("dialog", { name: "Edit details" })).toBeVisible();

        await page.getByRole("dialog", { name: "Edit details" }).press("Escape");
    });

    await test.step("'Delete' modal, when playlist is in our library", async () => {
        const item = page.getByTestId("library-item-playlist").first();
        await item.click({ button: "right" });

        await page.getByRole("menuitem", { name: "Delete" }).click();
        await expect(page.getByRole("dialog", { name: "Delete" })).toBeVisible();
    });
});

test("allows toggling of track's heart button to follow/unfollow the track from your library", async ({ page }) => {
    const firstTrack = page.locator("tbody > tr").first();
    const lastTrack = page.locator("tbody > tr").last();
    const firstTrackBtn = firstTrack.getByRole("switch", { name: /your library/i });
    const lastTrackBtn = lastTrack.getByRole("switch", { name: /your library/i });

    await test.step("following first track of the playlist", async () => {
        // The button is hidden by default, we need to select the track row first.
        await selectTrackRow(firstTrack);

        await firstTrackBtn.click();
    });

    await test.step("following and unfollowing last track of the playlist", async () => {
        await selectTrackRow(lastTrack);

        await lastTrackBtn.click();
        await lastTrackBtn.click({ delay: 16 });
    });

    await expect(firstTrackBtn).toHaveAttribute("aria-checked", "true");
    await expect(lastTrackBtn).toHaveAttribute("aria-checked", "false");
});

function selectTrackRow(track: Locator, modifiers?: Array<"Shift" | "Control">) {
    // We need to override the default position, so that the click doesn't land on any links that
    // could navigate to another page.
    return track.click({
        position: {
            x: 1,
            y: 1,
        },
        modifiers,
    });
}
