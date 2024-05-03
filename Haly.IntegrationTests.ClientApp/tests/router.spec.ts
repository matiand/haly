import { expect, test } from "@playwright/test";
import { createFakePrivateUserDto } from "../mocks/createFakeDtos";
import { mockPutCurrentUser } from "../mocks/putCurrentUser";
import { mockPutMyLikedSongs } from "../mocks/putMyLikedSongs";
import { mockPutMyPlaylists } from "../mocks/putMyPlaylists";
import { mockGetMyFeed } from "../mocks/getMyFeed";
import { mockPostJobs } from "../mocks/postJobs";

test.beforeEach(async ({ page }) => {
    const currentUser = createFakePrivateUserDto();

    await mockPutCurrentUser(page, currentUser);
    await mockPutMyLikedSongs(page);
    await mockPutMyPlaylists(page, currentUser);
    await mockGetMyFeed(page);
    await mockPostJobs(page);

    await page.goto("/");
});

test("back and forward buttons works", async ({ page }) => {
    await test.step("Search page", async () => {
        await page
            .getByRole("link", {
                name: "Search",
                exact: true,
            })
            .click();
    });

    await test.step("Home page", async () => {
        await page
            .getByRole("link", {
                name: "Home",
                exact: true,
            })
            .click();
    });

    await expect(page).toHaveTitle("Home");
    await page.goBack();
    await expect(page).toHaveTitle("Search");
    await page.goForward();
    await expect(page).toHaveTitle("Home");
});

test.describe("Sidebar", () => {
    test("shows a banner with a link to the spotify web player", async ({ page }) => {
        const banner = page.getByRole("link", { name: "Spotify Web Player" });

        await expect(banner).toBeVisible();
    });

    test("shows a 'Liked Songs' item in your library", async ({ page }) => {
        await expect(
            page.getByRole("link", {
                name: "Liked Songs",
                exact: true,
            }),
        ).toBeVisible();
    });

    test("shows playlists in your library", async ({ page }) => {
        const playlistItems = page.getByTestId("library-item-playlist");

        await expect(playlistItems.first()).toBeVisible();

        expect(await playlistItems.count()).toBeGreaterThan(5);
    });

    test("navigates to a playlist page, when a playlist item is clicked", async ({ page }) => {
        const playlistItem = page.getByTestId("library-item-playlist").first();

        await expect(playlistItem.first()).toBeVisible();
        await playlistItem.click();

        await expect(page).toHaveURL(/playlist/);
    });
});
