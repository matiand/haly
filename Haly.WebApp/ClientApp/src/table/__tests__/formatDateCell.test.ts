import { addDays, addHours, addMinutes, addSeconds } from "date-fns";
import { expect, test } from "vitest";
import { describe } from "vitest";

import formatDateCell from "../formatDateCell";

describe("date is older than or equal 30 days", () => {
    test("returns a string in a 'MMM d, y' format", () => {
        const dateA = new Date(1999, 7, 5);
        const dateB = new Date(2018, 4, 1);

        expect(formatDateCell(dateA)).toBe("Aug 5, 1999");
        expect(formatDateCell(dateB)).toBe("May 1, 2018");
    });
});

describe("date is older than or equal 7 days and not older than 30 days", () => {
    test("returns a string in a 'weeks ago' format", () => {
        const dateA = addDays(new Date(), -6);
        const dateB = addDays(new Date(), -7);
        const dateC = addDays(new Date(), -15);
        const dateD = addDays(new Date(), -29);
        const dateE = addDays(new Date(), -30);

        expect(formatDateCell(dateA)).not.toMatch(/weeks? ago/);
        expect(formatDateCell(dateB)).toBe("1 week ago");
        expect(formatDateCell(dateC)).toBe("2 weeks ago");
        expect(formatDateCell(dateD)).toBe("4 weeks ago");
        expect(formatDateCell(dateE)).not.toMatch(/weeks ago/);
    });
});

describe("date is not older than 7 days", () => {
    test("returns a string in a 'n <unit> ago' format, where <unit> is 'day', 'hour', 'minute' or 'second'", () => {
        const dateA = addDays(new Date(), -6);
        const dateB = addHours(new Date(), -28);
        const dateC = addHours(new Date(), -12);
        const dateD = addMinutes(new Date(), -80);
        const dateE = addMinutes(new Date(), -30);
        const dateF = addSeconds(new Date(), -80);
        const dateG = addSeconds(new Date(), -30);

        expect(formatDateCell(dateA)).toBe("6 days ago");
        expect(formatDateCell(dateB)).toBe("1 day ago");
        expect(formatDateCell(dateC)).toBe("12 hours ago");
        expect(formatDateCell(dateD)).toBe("1 hour ago");
        expect(formatDateCell(dateE)).toBe("30 minutes ago");
        expect(formatDateCell(dateF)).toBe("1 minute ago");
        expect(formatDateCell(dateG)).toBe("30 seconds ago");
    });
});
