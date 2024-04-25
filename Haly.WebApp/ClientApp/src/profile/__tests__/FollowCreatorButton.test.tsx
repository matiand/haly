// @vitest-environment happy-dom
import { simpleFaker } from "@faker-js/faker";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import toast from "react-hot-toast";
import { afterEach, describe, expect, test, vi } from "vitest";

import { CreatorType } from "../../../generated/haly";
import halyClient from "../../halyClient";
import FollowCreatorButton from "../FollowCreatorButton";

vi.mock("../../halyClient");
vi.mock("react-hot-toast");

describe("'follow' flow", () => {
    const creatorId = simpleFaker.string.numeric(12);
    const creatorType = simpleFaker.helpers.arrayElement<CreatorType>(["Artist", "User"]);

    afterEach(() => {
        vi.resetAllMocks();
    });

    test("renders a button with 'Following' text on a successful follow", () => {
        render(<FollowCreatorButton creatorId={creatorId} initialValue={false} type={creatorType} />, {
            wrapper: Wrapper,
        });
        const button = screen.getByRole("button");
        fireEvent.click(button);

        expect(button).toHaveTextContent("Following");
    });

    test("follows the creator when clicked", async () => {
        render(<FollowCreatorButton creatorId={creatorId} initialValue={false} type={creatorType} />, {
            wrapper: Wrapper,
        });
        const button = screen.getByRole("button");
        fireEvent.click(button);

        await waitFor(() => {
            expect(halyClient.meFollowing.followCreator).toHaveBeenCalledOnce();
            expect(halyClient.meFollowing.followCreator).toHaveBeenCalledWith({
                id: creatorId,
                type: creatorType,
            });
        });
    });

    test("shows a 'Added to Your Library' toast on a successful follow", async () => {
        render(<FollowCreatorButton creatorId={creatorId} initialValue={false} type={creatorType} />, {
            wrapper: Wrapper,
        });
        const button = screen.getByRole("button");
        fireEvent.click(button);

        await waitFor(() => {
            expect(toast).toHaveBeenCalledOnce();
            expect(toast).toHaveBeenCalledWith("Added to Your Library.");
        });
    });
});

describe("'unfollow' flow", () => {
    const creatorId = simpleFaker.string.numeric(12);
    const creatorType = simpleFaker.helpers.arrayElement<CreatorType>(["Artist", "User"]);

    afterEach(() => {
        vi.resetAllMocks();
    });

    test("renders a button with 'Follow' text on a successful unfollow", () => {
        render(<FollowCreatorButton creatorId={creatorId} initialValue={true} type={creatorType} />, {
            wrapper: Wrapper,
        });
        const button = screen.getByRole("button");
        fireEvent.click(button);

        expect(button).toHaveTextContent("Follow");
    });

    test("unfollows the creator when clicked", async () => {
        render(<FollowCreatorButton creatorId={creatorId} initialValue={true} type={creatorType} />, {
            wrapper: Wrapper,
        });
        const button = screen.getByRole("button");
        fireEvent.click(button);

        await waitFor(() => {
            expect(halyClient.meFollowing.unfollowCreator).toHaveBeenCalledOnce();
            expect(halyClient.meFollowing.unfollowCreator).toHaveBeenCalledWith({
                id: creatorId,
                type: creatorType,
            });
        });
    });

    test("shows a 'Removed from Your Library' toast on a successful unfollow", async () => {
        render(<FollowCreatorButton creatorId={creatorId} initialValue={true} type={creatorType} />, {
            wrapper: Wrapper,
        });
        const button = screen.getByRole("button");
        fireEvent.click(button);

        await waitFor(() => {
            expect(toast).toHaveBeenCalledOnce();
            expect(toast).toHaveBeenCalledWith("Removed from Your Library.");
        });
    });
});

function Wrapper({ children }: { children: React.ReactNode }) {
    return <QueryClientProvider client={new QueryClient()}>{children}</QueryClientProvider>;
}
