// @vitest-environment happy-dom
import { fireEvent, render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";

import Checkbox from "../Checkbox";

test("toggles the checked state when clicked", () => {
    render(<Checkbox id="foo" label="bar" defaultValue={true} onChange={vi.fn()} />);
    const checkbox = screen.getByRole("checkbox");

    expect(checkbox).toHaveAttribute("aria-checked", "true");
    fireEvent.click(checkbox);

    expect(checkbox).toHaveAttribute("aria-checked", "false");
});

test("calls the 'onChange' prop with new value when clicked", () => {
    const onChange = vi.fn();

    render(<Checkbox id="foo" label="bar" defaultValue={true} onChange={onChange} />);
    fireEvent.click(screen.getByRole("checkbox"));

    expect(onChange).toHaveBeenCalledOnce();
    expect(onChange).toHaveBeenCalledWith(false);
});
