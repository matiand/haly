// @vitest-environment happy-dom
import { simpleFaker } from "@faker-js/faker";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import React, { ReactNode } from "react";
import toast from "react-hot-toast";
import { afterEach, describe, expect, test, vi } from "vitest";

import StoreProvider, { AtomTuples, makeAtomTuple } from "../../../tests/utils/StoreProvider";
import halyClient from "../../halyClient";
import { likedSongIdByPlaybackIdAtom } from "../atoms/trackAtoms";
import useHeartMutations, { HeartMutationParams } from "../useHeartMutations";

vi.mock("../../halyClient");
vi.mock("react-hot-toast");

afterEach(() => {
    vi.clearAllMocks();
});

describe("follow playlist", () => {
    test("calls followPlaylist api endpoint", async () => {
        const params: HeartMutationParams = {
            id: simpleFaker.string.numeric(12),
            type: "playlist",
        };

        const { result } = renderHook(() => useHeartMutations(), { wrapper: QueryWrapper });
        result.current.follow.mutate(params);

        await waitFor(() => {
            expect(halyClient.meFollowing.followPlaylist).toBeCalledWith({ id: params.id });
        });
    });

    test("renders a toast with 'Added to Your Library.' message", async () => {
        const params: HeartMutationParams = {
            id: simpleFaker.string.numeric(12),
            type: "playlist",
        };

        const { result } = renderHook(() => useHeartMutations(), { wrapper: QueryWrapper });
        result.current.follow.mutate(params);

        await waitFor(() => {
            expect(toast).toBeCalledWith("Added to Your Library.");
        });
    });
});

describe("follow album", () => {
    test("calls followAlbum api endpoint", async () => {
        const params: HeartMutationParams = {
            id: simpleFaker.string.numeric(12),
            type: "album",
        };

        const { result } = renderHook(() => useHeartMutations(), { wrapper: QueryWrapper });
        result.current.follow.mutate(params);

        await waitFor(() => {
            expect(halyClient.meFollowing.followAlbum).toBeCalledWith({ id: params.id });
        });
    });

    test("renders a toast with 'Added to Your Library.' message", async () => {
        const params: HeartMutationParams = {
            id: simpleFaker.string.numeric(12),
            type: "album",
        };

        const { result } = renderHook(() => useHeartMutations(), { wrapper: QueryWrapper });
        result.current.follow.mutate(params);

        await waitFor(() => {
            expect(toast).toBeCalledWith("Added to Your Library.");
        });
    });
});

describe("follow tracks", () => {
    test("calls followTracks api endpoint with provided likedIds", async () => {
        const params: HeartMutationParams = {
            id: simpleFaker.string.numeric(12),
            type: "album",
        };

        const { result } = renderHook(() => useHeartMutations(), { wrapper: QueryWrapper });
        result.current.follow.mutate(params);

        await waitFor(() => {
            expect(halyClient.meFollowing.followAlbum).toBeCalledWith({ id: params.id });
        });
    });

    test("renders a toast with 'Added to Liked Songs.' message", async () => {
        const params: HeartMutationParams = {
            id: simpleFaker.string.numeric(12),
            type: "album",
        };

        const { result } = renderHook(() => useHeartMutations(), { wrapper: QueryWrapper });
        result.current.follow.mutate(params);

        await waitFor(() => {
            expect(toast).toBeCalledWith("Added to Your Library.");
        });
    });

    test("adds followed tracks to our store", async () => {});
});

describe("unfollow playlist", () => {
    test("calls unfollowPlaylist api endpoint", async () => {
        const params: HeartMutationParams = {
            id: simpleFaker.string.numeric(12),
            type: "playlist",
        };

        const { result } = renderHook(() => useHeartMutations(), { wrapper: QueryWrapper });
        result.current.unfollow.mutate(params);

        await waitFor(() => {
            expect(halyClient.meFollowing.unfollowPlaylist).toBeCalledWith({ id: params.id });
        });
    });

    test("renders a toast with 'Removed from Your Library.' message", async () => {
        const params: HeartMutationParams = {
            id: simpleFaker.string.numeric(12),
            type: "playlist",
        };

        const { result } = renderHook(() => useHeartMutations(), { wrapper: QueryWrapper });
        result.current.unfollow.mutate(params);

        await waitFor(() => {
            expect(toast).toBeCalledWith("Removed from Your Library.");
        });
    });
});

describe("unfollow album", () => {
    test("calls unfollowAlbum api endpoint", async () => {
        const params: HeartMutationParams = {
            id: simpleFaker.string.numeric(12),
            type: "album",
        };

        const { result } = renderHook(() => useHeartMutations(), { wrapper: QueryWrapper });
        result.current.unfollow.mutate(params);

        await waitFor(() => {
            expect(halyClient.meFollowing.unfollowAlbum).toBeCalledWith({ id: params.id });
        });
    });

    test("renders a toast with 'Removed from Your Library.' message", async () => {
        const params: HeartMutationParams = {
            id: simpleFaker.string.numeric(12),
            type: "album",
        };

        const { result } = renderHook(() => useHeartMutations(), { wrapper: QueryWrapper });
        result.current.unfollow.mutate(params);

        await waitFor(() => {
            expect(toast).toBeCalledWith("Removed from Your Library.");
        });
    });
});

describe("unfollow tracks", () => {
    test("calls unfollowTracks api endpoint with provided likedIds", async () => {
        const ids = simpleFaker.helpers.multiple(
            () => ({
                likedId: simpleFaker.string.numeric(12),
                playbackId: simpleFaker.string.numeric(12),
            }),
            { count: 3 },
        );
        const params: HeartMutationParams = {
            type: "track",
            ids,
        };
        const likedSongsAtom = makeAtomTuple(likedSongIdByPlaybackIdAtom, {
            [simpleFaker.string.numeric(12)]: simpleFaker.string.numeric(12),
        });

        const { result } = renderHook(() => useHeartMutations(), { wrapper: QueryAndStoreWrapper([likedSongsAtom]) });
        result.current.unfollow.mutate(params);

        await waitFor(() => {
            expect(halyClient.meFollowing.unfollowTracks).toBeCalledWith({ requestBody: ids.map((i) => i.likedId) });
        });
    });

    test("renders a toast with 'Removed from Liked Songs.' message", async () => {
        const ids = simpleFaker.helpers.multiple(
            () => ({
                likedId: simpleFaker.string.numeric(12),
                playbackId: simpleFaker.string.numeric(12),
            }),
            { count: 3 },
        );
        const params: HeartMutationParams = {
            type: "track",
            ids,
        };
        const likedSongsAtom = makeAtomTuple(likedSongIdByPlaybackIdAtom, {
            [simpleFaker.string.numeric(12)]: simpleFaker.string.numeric(12),
        });

        const { result } = renderHook(() => useHeartMutations(), { wrapper: QueryAndStoreWrapper([likedSongsAtom]) });
        result.current.unfollow.mutate(params);

        await waitFor(() => {
            expect(toast).toBeCalledWith("Removed from Liked Songs.");
        });
    });
});

function QueryWrapper({ children }: { children: React.ReactNode }) {
    return <QueryClientProvider client={new QueryClient()}>{children}</QueryClientProvider>;
}

function QueryAndStoreWrapper(atomTuples: AtomTuples) {
    return function Inner({ children }: { children: ReactNode }) {
        return (
            <QueryClientProvider client={new QueryClient()}>
                <StoreProvider atomTuples={atomTuples}>{children}</StoreProvider>
            </QueryClientProvider>
        );
    };
}
