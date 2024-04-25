// @vitest-environment happy-dom
import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";

import { createRandomTrack } from "../../../tests/utils/createRandomData";
import TrackDurationCell from "../TrackDurationCell";

test("renders track duration", () => {
    const track = createRandomTrack();

    render(<TrackDurationCell track={track} noActions />);

    expect(screen.getByText(track.duration)).toBeInTheDocument();
});

test("renders no buttons, when 'noActions' prop is true", () => {
    const track = createRandomTrack();

    render(<TrackDurationCell track={track} noActions />);

    expect(screen.queryByRole("button")).not.toBeInTheDocument();
});
