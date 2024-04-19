// @vitest-environment happy-dom
import { faker } from "@faker-js/faker";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import ConnectBar from "../ConnectBar";

describe("'forbidden' state", () => {
    test("renders a message telling the user that they are not allowed to use playback", () => {
        render(<ConnectBar type="forbidden" />);

        const message = screen.getByText(/playback not allowed/i);
        expect(message).toBeInTheDocument();
    });

    test("renders a link to the upgrade to premium page", () => {
        render(<ConnectBar type="forbidden" />);

        const link = screen.getByRole("link");
        expect(link).toHaveTextContent(/upgrade to premium/i);
    });
});

describe("'failure' state", () => {
    test("renders a 'try again' button", () => {
        const onAction = vi.fn();

        render(<ConnectBar type="failure" onAction={onAction} />);

        const button = screen.getByRole("button");
        expect(button).toBeInTheDocument();

        fireEvent.click(button);
        expect(onAction).toHaveBeenCalledOnce();
    });
});

describe("'available' state", () => {
    test("renders a 'transfer playback' button", () => {
        const onAction = vi.fn();

        render(<ConnectBar type="available" onAction={onAction} />);

        const button = screen.getByRole("button");
        expect(button).toHaveTextContent(/transfer playback/i);
    });

    test("renders the name of the currently active device if there is one", () => {
        const deviceName = faker.lorem.word();

        render(<ConnectBar type="available" onAction={vi.fn()} activeDeviceName={deviceName} />);

        const node = screen.getByText(/listening on/i);
        expect(node).toHaveTextContent(deviceName);
    });
});
