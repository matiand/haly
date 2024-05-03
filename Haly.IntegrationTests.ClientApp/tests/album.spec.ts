import { expect, Locator, test as base } from "@playwright/test";
import {
    AlbumDetailedDto,
    createFakeAlbumDetailedDto,
    createFakePrivateUserDto,
    createFakeReleaseItemDto,
    ReleaseItemDto,
} from "../mocks/createFakeDtos";
import { mockPutCurrentUser } from "../mocks/putCurrentUser";
import { mockPutMyLikedSongs } from "../mocks/putMyLikedSongs";
import { mockPutMyPlaylists } from "../mocks/putMyPlaylists";
import { mockPostJobs } from "../mocks/postJobs";
import { mockGetAlbum } from "../mocks/getAlbum";
import { mockGetAlbumRecommendations } from "../mocks/getAlbumRecommendations";
import { faker } from "@faker-js/faker";

type AlbumSpec = {
    album: AlbumDetailedDto;
    recommendations: ReleaseItemDto[];
};

const test = base.extend<AlbumSpec>({
    album: createFakeAlbumDetailedDto(),
    recommendations: faker.helpers.multiple(() => createFakeReleaseItemDto(), { count: 12 }),
});

test.beforeEach(async ({ page, album, recommendations }) => {
    const currentUser = createFakePrivateUserDto();

    await mockPutCurrentUser(page, currentUser);
    await mockPutMyLikedSongs(page);
    await mockPutMyPlaylists(page, currentUser);
    await mockPostJobs(page);

    await mockGetAlbum(page, album);
    await mockGetAlbumRecommendations(page, album, recommendations);

    await page.goto(`/album/${album.id}`);
});

test("title contains album and artist name", async ({ page, album }) => {
    await expect(page).toHaveTitle(`${album.name} by ${album.artists[0].name}`);
});

test("page contains information about the album", async ({ page, album }) => {
    await test.step("album name", async () => {
        await expect(
            page.getByRole("heading", {
                name: album.name,
                exact: true,
            }),
        ).toBeVisible();
    });

    await test.step("album type", async () => {
        await expect(
            page.getByRole("heading", {
                name: /album|single|ep/i,
            }),
        ).toBeVisible();
    });

    await test.step("album artists", async () => {
        for (const artist of album.artists) {
            await expect(
                page.getByRole("link", {
                    name: artist.name,
                    exact: true,
                }),
            ).toBeVisible();
        }
    });

    await test.step("release year", async () => {
        await expect(page.getByText(`${album.releaseYear}`, { exact: true })).toBeVisible();
    });

    await test.step("duration", async () => {
        await expect(page.getByText(album.totalDuration)).toBeVisible();
    });

    await test.step("number of tracks", async () => {
        await expect(page.getByText(`${album.tracks.length} songs`)).toBeVisible();
    });

    await test.step("copyright information", async () => {
        await expect(page.getByText(album.copyrights[0])).toBeVisible();
    });
});

test("shows a header menu with album name visible, when some scrolling threshold is reached", async ({ page }) => {
    const menuTitle = page.getByTestId("upper-menu-title");

    await expect(menuTitle).not.toBeVisible();

    await page.getByTestId("card-group").filter({ hasText: "Similar" }).scrollIntoViewIfNeeded();

    await expect(menuTitle).toBeInViewport();
});

test("shows other album recommendations", async ({ page, recommendations }) => {
    const recommendationsGroup = page.getByTestId("card-group").filter({ hasText: "Similar" });
    const firstCard = recommendationsGroup.getByTestId("card").first();

    await expect(recommendationsGroup).toBeVisible();
    await expect(firstCard.getByText(recommendations[0].name)).toBeVisible();
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

test("allows opening a context menu with additional options", async ({ page, album }) => {
    await test.step("when right clicking on album's name heading", async () => {
        const heading = page.getByRole("heading", { name: album.name });
        await heading.click({ button: "right" });

        await expect(page.getByRole("menuitem", { name: "Share" })).toBeVisible();

        await page.getByRole("menu").press("Escape");
    });

    await test.step("when clicking on a more options button", async () => {
        await expect(page.getByRole("menuitem", { name: "Share" })).not.toBeVisible();

        const button = page.getByRole("button", { name: "More options for album" });
        await button.click();

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

test("shows a modal with large variant of the album's artwork, when clicking on album's image", async ({ page }) => {
    await page.getByRole("button", { name: "album image" }).click();

    await expect(page.getByRole("dialog")).toBeVisible();
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
