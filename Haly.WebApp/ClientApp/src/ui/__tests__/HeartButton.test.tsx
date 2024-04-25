// @vitest-environment happy-dom
import { simpleFaker } from "@faker-js/faker";
import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, test, vi } from "vitest";

import { HeartMutationParams } from "../../common/useHeartMutations";
import HeartButton from "../HeartButton";

const followMock = vi.fn();
const unfollowMock = vi.fn();

vi.mock("../../common/useHeartMutations", () => ({
    default: () => ({
        follow: { mutate: followMock },
        unfollow: { mutate: unfollowMock },
    }),
}));

afterEach(() => {
    vi.clearAllMocks();
});

test("calls 'follow' mutation, when button is off", () => {
    const mutationParams: HeartMutationParams = {
        type: "playlist",
        id: simpleFaker.string.numeric(12),
    };

    render(<HeartButton params={mutationParams} state={false} />);
    fireEvent.click(screen.getByRole("switch"));

    expect(followMock).toHaveBeenCalledWith(mutationParams);
    expect(unfollowMock).not.toHaveBeenCalled();
});

test("calls 'unfollow' mutation, when button is on", () => {
    const mutationParams: HeartMutationParams = {
        type: "playlist",
        id: simpleFaker.string.numeric(12),
    };

    render(<HeartButton params={mutationParams} state={true} />);
    fireEvent.click(screen.getByRole("switch"));

    expect(unfollowMock).toHaveBeenCalledWith(mutationParams);
    expect(followMock).not.toHaveBeenCalled();
});

test("changes the button state, when 'state' props is changed", () => {
    const mutationParams: HeartMutationParams = {
        type: "playlist",
        id: simpleFaker.string.numeric(12),
    };

    const { rerender } = render(<HeartButton params={mutationParams} state={true} />);

    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "true");

    rerender(<HeartButton params={mutationParams} state={false} />);
    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "false");
});
