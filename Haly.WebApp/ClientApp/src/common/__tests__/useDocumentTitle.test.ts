// @vitest-environment happy-dom
import { renderHook } from "@testing-library/react";
import { expect, test } from "vitest";

import useDocumentTitle from "../useDocumentTitle";

test("updates document title", () => {
    renderHook(() => useDocumentTitle("Foo"));

    expect(document.title).toBe("Foo");
});
