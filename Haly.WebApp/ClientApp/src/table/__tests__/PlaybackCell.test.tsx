// @vitest-environment happy-dom
import { fireEvent, render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";

import PlaybackCell from "../PlaybackCell";

test("playback button is disabled when track is a podcast", () => {
    render(<PlaybackCell position={1} name="test" playbackState="none" isPodcast={true} />);
    const button = screen.getByRole("button");

    expect(button).toBeDisabled();
});

test("does not render any buttons when 'playbackAction' prop is undefined", () => {
    render(<PlaybackCell position={1} name="test" playbackState="none" />);
    const button = screen.queryByRole("button");

    expect(button).not.toBeInTheDocument();
});

test("calls 'playbackAction' prop when playback button is clicked", () => {
    const playbackAction = vi.fn();
    render(<PlaybackCell position={1} name="test" playbackState="none" playbackAction={playbackAction} />);
    fireEvent.click(screen.getByRole("button"));

    expect(playbackAction).toHaveBeenCalledOnce();
});

test("renders music bars when track is playing", () => {
    render(<PlaybackCell position={1} name="test" playbackState="playing" playbackAction={vi.fn()} />);
    const bars = screen.getByTestId("animated-music-bars");

    expect(bars).toBeInTheDocument();
});

test("renders track position in the table when track is not playing", () => {
    render(<PlaybackCell position={1} name="test" playbackState="none" />);
    const position = screen.getByText(1);

    expect(position).toBeInTheDocument();
});
