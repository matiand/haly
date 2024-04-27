// const key = "oidc.user:https://accounts.spotify.com:57fc955add2146acb0b8a8c1d23d24a7";
import { faker } from "@faker-js/faker";
import { addHours, getUnixTime } from "date-fns";
import { test as setup } from "@playwright/test";

const key = `oidc.user:https://accounts.spotify.com:${process.env.SPOTIFY_CLIENT_ID}`;

const authData = {
    session_state: null,
    access_token: faker.string.alphanumeric(300),
    refresh_token: faker.string.alphanumeric(128),
    token_type: "Bearer",
    // todo: clear this out
    scope: "playlist-read-private playlist-read-collaborative user-follow-read playlist-modify-private user-read-email user-read-private streaming user-modify-playback-state user-follow-modify user-library-read user-library-modify playlist-modify-public user-read-playback-state user-read-currently-playing user-read-recently-played user-top-read",
    profile: {},
    expires_at: getUnixTime(addHours(new Date(), 1)),
};

setup("authenticate", async ({ page }) => {
    await page.goto("/");

    await page.evaluate(
        ([key, value]) => {
            window.localStorage.setItem(key, JSON.stringify(value));
        },
        [key, authData] as const,
    );

    const authFile = ".auth/user.json";
    await page.context().storageState({ path: authFile });
});
