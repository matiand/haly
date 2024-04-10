import { describe, expect, test } from "vitest";

import { pluralize } from "../pluralize";

describe("amount is 0", () => {
    test("formatted string is plural", () => {
        expect(pluralize("like", 0)).toBe("0 likes");
        expect(pluralize("track", 0)).toBe("0 tracks");
    });
});

describe("amount is 1", () => {
    test("formatted string is singular", () => {
        expect(pluralize("like", 1)).toBe("1 like");
        expect(pluralize("track", 1)).toBe("1 track");
    });
});

describe("amount is bigger than 1", () => {
    test("formatted string is plural", () => {
        expect(pluralize("like", 5)).toBe("5 likes");
        expect(pluralize("track", 9)).toBe("9 tracks");
    });

    test("number is formatted according to user's locale settings", () => {
        expect(pluralize("like", 5_000_000)).toMatch(/5.+? likes/);
        expect(pluralize("track", 9_000)).toMatch(/9.+? tracks/);
    });
});
