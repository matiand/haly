// @vitest-environment happy-dom
import { fireEvent, render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";

import PlaybackToggle from "../PlaybackToggle";

test("calls 'toggle' prop when clicked", () => {
    const toggle = vi.fn();

    render(<PlaybackToggle size="medium" isPaused={true} toggle={toggle} />);
    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(toggle).toHaveBeenCalledOnce();
});

test("renders a button with a 'play' label, when 'isPaused' is 'true'", () => {
    render(<PlaybackToggle size="medium" isPaused toggle={vi.fn()} />);
    const button = screen.getByLabelText(/play/i);

    expect(button).toBeInTheDocument();
});

test("renders a button with a 'pause' label, when 'isPaused' is 'false'", () => {
    render(<PlaybackToggle size="medium" isPaused={false} toggle={vi.fn()} />);
    const button = screen.getByLabelText(/pause/i);

    expect(button).toBeInTheDocument();
});
