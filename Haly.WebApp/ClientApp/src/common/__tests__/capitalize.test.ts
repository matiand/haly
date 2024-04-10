import { expect, test } from "vitest";

import { capitalize } from "../capitalize";

test("capitalizes a string", () => {
    expect(capitalize("hello")).toBe("Hello");
    expect(capitalize("hello world")).toBe("Hello world");
});
