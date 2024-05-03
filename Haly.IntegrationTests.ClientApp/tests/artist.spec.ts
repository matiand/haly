import {
    ArtistDetailedDto,
    ArtistDiscographyDto,
    createFakeArtistDetailedDto,
    createFakeArtistDiscographyDto,
    createFakePlaylistWithTracksDto,
    createFakePrivateUserDto,
    PlaylistWithTracksDto,
} from "../mocks/createFakeDtos";
import { expect, test as base } from "@playwright/test";
import { mockPutCurrentUser } from "../mocks/putCurrentUser";
import { mockPutMyLikedSongs } from "../mocks/putMyLikedSongs";
import { mockPutMyPlaylists } from "../mocks/putMyPlaylists";
import { mockPostJobs } from "../mocks/postJobs";
import { mockGetPlaylist } from "../mocks/getPlaylist";
import { mockPutPlaylist } from "../mocks/putPlaylist";
import { mockGetPlaylistTracks } from "../mocks/getPlaylistTracks";
import { mockPutFollowing } from "../mocks/putFollowing";
import { mockDeleteFollowing } from "../mocks/deleteFollowing";
import { mockGetArtist } from "../mocks/getArtist";
import { mockGetArtistDiscography } from "../mocks/getArtistDiscography";
import { mockGetArtistAppearances } from "../mocks/getArtistAppearances";

type ArtistSpec = {
    artist: ArtistDetailedDto;
    discography: ArtistDiscographyDto;
};

const test = base.extend<ArtistSpec>({
    artist: createFakeArtistDetailedDto(),
    discography: createFakeArtistDiscographyDto(),
});

test.beforeEach(async ({ page, artist, discography }) => {
    const currentUser = createFakePrivateUserDto();

    await mockPutCurrentUser(page, currentUser);
    await mockPutMyLikedSongs(page);
    await mockPutMyPlaylists(page, currentUser);
    await mockPostJobs(page);

    await mockGetArtist(page, artist);
    await mockGetArtistDiscography(page, artist, discography);
    await mockGetArtistAppearances(page, artist);

    await page.goto(`/artist/${artist.id}`);
});

test("title contains artist name", async ({ page, artist }) => {
    await expect(page).toHaveTitle(artist.name);
});

test("page contains information about the playlist", async ({ page, artist }) => {
    await test.step("artist name", async () => {
        await expect(
            page.getByRole("heading", {
                name: artist.name,
                exact: true,
            }),
        ).toBeVisible();
    });

    await test.step("number of followers", async () => {
        await expect(page.getByText(/followers?/i)).toBeVisible();
    });

    await test.step("genres", async () => {
        for (const genre of artist.genres) {
            await expect(page.getByText(genre)).toBeVisible();
        }
    });
});

test("shows a header menu with playlist name visible, when some scrolling threshold is reached", async ({ page }) => {
    const menuTitle = page.getByTestId("upper-menu-title");

    await expect(menuTitle).not.toBeVisible();

    await page.getByRole("heading", { name: "Appears On" }).scrollIntoViewIfNeeded();

    await expect(menuTitle).toBeInViewport();
});

test("shows top tracks of that artists", async ({ page }) => {
    const tracksTable = page.getByRole("table");

    await expect(tracksTable).toBeVisible();

    await test.step("shows top 5 by default", async () => {
        await expect(tracksTable.locator("tbody > tr")).toHaveCount(5);
    });

    await test.step("shows 5 more, when clicking on the 'See more' button", async () => {
        const button = page.getByRole("button", {
            name: "See more",
            exact: true,
        });

        await button.click();

        await expect(tracksTable.locator("tbody > tr")).toHaveCount(10);
    });

    await test.step("shows top 5 again, when clicking on the 'Show less' button", async () => {
        const button = page.getByRole("button", {
            name: "Show less",
            exact: true,
        });

        await button.click();

        await expect(tracksTable.locator("tbody > tr")).toHaveCount(5);
    });
});

test("shows artist discography", async ({ page, discography }) => {
    const discographyGroup = page.getByTestId("card-group").filter({ hasText: "Discography" });

    await test.step("clicking on the 'Albums' option, shows only albums", async () => {
        await page.getByRole("radio", { name: "Albums" }).click();

        await expect(discographyGroup.getByTestId("card")).toHaveCount(discography.albums.length);
    });

    await test.step("clicking on the 'Singles and EPs' option, shows only singles", async () => {
        await page.getByRole("radio", { name: "Singles" }).click();

        await expect(discographyGroup.getByTestId("card")).toHaveCount(discography.singlesAndEps.length);
    });

    await test.step("clicking on the 'All' option, shows all releases", async () => {
        await page.getByRole("radio", { name: "All" }).click();

        await expect(discographyGroup.getByTestId("card")).toHaveCount(discography.all.length);
    });
});
