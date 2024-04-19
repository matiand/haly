// @vitest-environment happy-dom
import { render, screen } from "@testing-library/react";
import { setHours } from "date-fns";
import { afterAll, beforeAll, expect, test, vi } from "vitest";

import IntersectionObserverMock from "../../../tests/utils/IntersectionObserverMock";
import Greeting from "../Greeting";

beforeAll(() => {
    vi.stubGlobal("IntersectionObserver", IntersectionObserverMock);
});

afterAll(() => {
    vi.unstubAllGlobals();
});

test("renders 'Good morning' when it's morning in the local time", () => {
    const morningDate = setHours(new Date(), 6);

    render(<Greeting date={morningDate} />);

    const greeting = screen.getByText(/good morning/i);
    expect(greeting).toBeInTheDocument();
});

test("renders 'Good afternoon' when it's afternoon in the local time", () => {
    const morningDate = setHours(new Date(), 15);

    render(<Greeting date={morningDate} />);

    const greeting = screen.getByText(/good afternoon/i);
    expect(greeting).toBeInTheDocument();
});

test("renders 'Good evening' when it's evening in the local time", () => {
    const morningDate = setHours(new Date(), 22);

    render(<Greeting date={morningDate} />);

    const greeting = screen.getByText(/good evening/i);
    expect(greeting).toBeInTheDocument();
});
