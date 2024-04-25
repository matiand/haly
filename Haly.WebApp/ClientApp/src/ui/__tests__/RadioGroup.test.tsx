// @vitest-environment happy-dom
import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, test, vi } from "vitest";

import RadioGroup, { Option } from "../RadioGroup";

const options: Option[] = [
    {
        name: "Option 1",
        onSelected: vi.fn(),
        isDefault: false,
    },
    {
        name: "Option 2",
        onSelected: vi.fn(),
        isDefault: true,
    },
    {
        name: "Option 3",
        onSelected: vi.fn(),
        isDefault: false,
    },
];

afterEach(() => {
    vi.clearAllMocks();
});

test("selects an option with isDefault set to true on first render", () => {
    render(<RadioGroup options={options} />);
    const option = screen.getByRole("radio", { name: "Option 2" });

    expect(option).toHaveAttribute("aria-checked", "true");
});

test("only one option can be selected", () => {
    render(<RadioGroup options={options} />);
    const group = screen.getByRole("group");
    const firstOption = screen.getByRole("radio", { name: "Option 1" });
    fireEvent.click(firstOption);
    const selectedItems = group.querySelectorAll("[aria-checked=true]");

    expect(firstOption).toHaveAttribute("aria-checked", "true");
    expect(selectedItems.length).toBe(1);
});

test("calls onSelected when an option is selected", () => {
    render(<RadioGroup options={options} />);
    const firstOption = screen.getByRole("radio", { name: "Option 1" });
    fireEvent.click(firstOption);

    expect(options[0].onSelected).toHaveBeenCalledOnce();
    expect(options[1].onSelected).not.toHaveBeenCalled();
});
