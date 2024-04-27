import { test, expect } from "@playwright/test";

// Don't use the authenticated storage state.
test.use({
    storageState: {
        cookies: [],
        origins: [],
    },
});

test("has title", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle("Haly");
});

test("has 'sign in' button", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("button", { name: /sign in/i })).toBeVisible();
});
