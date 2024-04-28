import { expect, test } from "@playwright/test";
import { mockPutCurrentUser } from "../mocks/putCurrentUser";
import { mockPutMyLikedSongs } from "../mocks/putMyLikedSongs";
import { createFakePrivateUserDto } from "../mocks/createFakeDtos";
import { mockPutMyPlaylists } from "../mocks/putMyPlaylists";
import { mockGetMyFeed } from "../mocks/getMyFeed";
import { mockPostJobs } from "../mocks/postJobs";

test.beforeEach(async ({ page }) => {
    const currentUser = createFakePrivateUserDto();
    currentUser.isPlaybackAllowed = false;

    await mockPutCurrentUser(page, currentUser);
    await mockPutMyLikedSongs(page);
    await mockPutMyPlaylists(page, currentUser);
    await mockGetMyFeed(page);
    await mockPostJobs(page);

    await page.goto("/");
});

test("has title", async ({ page }) => {
    await expect(page).toHaveTitle("Home");
});

test("has a 'Made for you' section with playlist cards", async ({ page }) => {
    const cardSection = page.getByTestId("card-group").filter({ has: page.getByRole("heading", { name: /Made for/ }) });

    await expect(cardSection).toBeVisible();
    expect(await cardSection.getByTestId("card").count()).toBeGreaterThan(0);
});

test("has some other section with cards", async ({ page }) => {
    const cardSection = page
        .getByTestId("card-group")
        .filter({ hasNot: page.getByRole("heading", { name: /Made for/ }) });

    await expect(cardSection.first()).toBeVisible();
});

test("shows a footer explaining that playback is not allowed", async ({ page }) => {
    const footer = page.locator("footer");

    await expect(footer).toHaveText(/playback not allowed/i);
});

test("shows a header menu with 'Home' text visible, when some scrolling threshold is reached", async ({ page }) => {
    const cardSection = page.getByTestId("card-group").filter({ hasNotText: /Made for/ });
    const menuTitle = page.getByTestId("upper-menu-title");

    await expect(cardSection.last()).toBeVisible();
    await expect(menuTitle).not.toBeVisible();

    await cardSection.last().scrollIntoViewIfNeeded();

    await expect(menuTitle).toBeVisible();
});

test.describe("cards", () => {
    test("shows a button for playback on hover", async ({ page }) => {
        const card = page.getByTestId("card").first();

        await card.hover();

        await expect(card.getByLabel(/play/i)).toBeVisible();
    });

    test("shows a context menu on right click", async ({ page }) => {
        const card = page.getByTestId("card").first();
        await card.click({ button: "right" });

        expect(await page.getByRole("menu").getByRole("menuitem").count()).toBeGreaterThan(0);
    });

    test("caps the number of cards shown in a card section to available space", async ({ page }) => {
        const cardSection = page.getByTestId("card-group").first();

        expect(await cardSection.getByTestId("card").count()).toBeLessThan(10);
    });

    test("navigates to a playlist page, when a playlist card is clicked", async ({ page }) => {
        const cardSection = page.getByTestId("card-group").first();
        const playlistCard = cardSection.getByTestId("card").first();

        await playlistCard.click();

        await expect(page).toHaveURL(/playlist/);
    });
});
