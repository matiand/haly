// @vitest-environment happy-dom
import { faker } from "@faker-js/faker";
import { renderHook } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import { AlbumDetailedDto } from "../../../generated/haly";
import createRandomStreamedTrack from "../../../tests/utils/createRandomStreamedTrack";
import createRandomUri from "../../../tests/utils/createRandomUri";
import StoreProvider, { makeAtomTuple } from "../../../tests/utils/StoreProvider";
import { PageContext, pageContextAtom } from "../../common/atoms/pageAtoms";
import { streamedTrackAtom } from "../../common/atoms/playbackAtoms";
import useTableRowPlaybackState from "../useTableRowPlaybackState";

describe("page context is different from streamed track's context", () => {
    const albumContext = createRandomAlbumContext();
    const streamedTrack = createRandomStreamedTrack(createRandomUri(), false);
    const atomTuples = [makeAtomTuple(pageContextAtom, albumContext), makeAtomTuple(streamedTrackAtom, streamedTrack)];

    const { result } = renderHook(() => useTableRowPlaybackState(), {
        wrapper: ({ children }) => <StoreProvider atomTuples={atomTuples}>{children}</StoreProvider>,
    });

    test("returns 'none', even if table row's track has the same playbackId as streamed track", () => {
        const playbackState = result.current(streamedTrack.playbackId);

        expect(playbackState).toBe("none");
    });

    test("returns 'none', if track playbackId is empty", () => {
        const playbackState = result.current("");

        expect(playbackState).toBe("none");
    });
});

describe("page context is the same as streamed track's context", () => {
    const albumContext = createRandomAlbumContext();
    const albumUri = `spotify:album:${albumContext.data.id}`;
    const streamedTrack = createRandomStreamedTrack(albumUri, false);
    const atomTuples = [makeAtomTuple(pageContextAtom, albumContext), makeAtomTuple(streamedTrackAtom, streamedTrack)];

    test("returns 'none', if track playbackId is empty", () => {
        const { result } = renderHook(() => useTableRowPlaybackState(), {
            wrapper: ({ children }) => <StoreProvider atomTuples={atomTuples}>{children}</StoreProvider>,
        });
        const playbackState = result.current("");

        expect(playbackState).toBe("none");
    });

    test("returns 'none', if streamed track differs from table row's track", () => {
        const playbackId = faker.string.numeric(12);

        const { result } = renderHook(() => useTableRowPlaybackState(), {
            wrapper: ({ children }) => <StoreProvider atomTuples={atomTuples}>{children}</StoreProvider>,
        });
        const playbackState = result.current(playbackId);

        expect(playbackState).toBe("none");
    });

    test("returns 'paused' if streamed track is paused and has the same playbackId as table row's track", () => {
        streamedTrack.isPaused = true;

        const { result } = renderHook(() => useTableRowPlaybackState(), {
            wrapper: ({ children }) => <StoreProvider atomTuples={atomTuples}>{children}</StoreProvider>,
        });
        const playbackState = result.current(streamedTrack.playbackId);

        expect(playbackState).toBe("paused");
    });

    test("returns 'playing' if streamed track is paused and has the same playbackId as table row's track", () => {
        streamedTrack.isPaused = false;

        const { result } = renderHook(() => useTableRowPlaybackState(), {
            wrapper: ({ children }) => <StoreProvider atomTuples={atomTuples}>{children}</StoreProvider>,
        });
        const playbackState = result.current(streamedTrack.playbackId);

        expect(playbackState).toBe("playing");
    });
});

function createRandomAlbumContext(): PageContext {
    return {
        type: "album",
        data: {
            id: faker.string.numeric(12),
            name: faker.commerce.productName(),
        } as AlbumDetailedDto,
    };
}
