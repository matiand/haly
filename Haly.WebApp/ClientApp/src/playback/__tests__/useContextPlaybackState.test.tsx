// @vitest-environment happy-dom
import { renderHook } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import createRandomStreamedTrack from "../../../tests/utils/createRandomStreamedTrack";
import createRandomUri from "../../../tests/utils/createRandomUri";
import StoreProvider, { makeAtomTuple } from "../../../tests/utils/StoreProvider";
import { streamedTrackAtom } from "../../common/atoms/playbackAtoms";
import useContextPlaybackState from "../useContextPlaybackState";

test("returns 'none', if streamed track does not belong to the context", () => {
    const contextUri = createRandomUri();
    const streamedTrack = createRandomStreamedTrack(contextUri, false);
    const streamedTrackTuple = makeAtomTuple(streamedTrackAtom, streamedTrack);

    const { result } = renderHook(() => useContextPlaybackState(), {
        wrapper: ({ children }) => <StoreProvider atomTuples={[streamedTrackTuple]}>{children}</StoreProvider>,
    });

    const playbackState = result.current(createRandomUri());
    expect(playbackState).toBe("none");
});

describe("streamed track belongs to the context", () => {
    const contextUri = createRandomUri();
    const streamedTrack = createRandomStreamedTrack(contextUri, false);
    const streamedTrackTuple = makeAtomTuple(streamedTrackAtom, streamedTrack);

    test("returns 'paused' if track is paused", () => {
        streamedTrack.isPaused = true;

        const { result } = renderHook(() => useContextPlaybackState(), {
            wrapper: ({ children }) => <StoreProvider atomTuples={[streamedTrackTuple]}>{children}</StoreProvider>,
        });

        const playbackState = result.current(contextUri);
        expect(playbackState).toBe("paused");
    });

    test("returns 'playing' if track is not paused", () => {
        streamedTrack.isPaused = false;

        const { result } = renderHook(() => useContextPlaybackState(), {
            wrapper: ({ children }) => <StoreProvider atomTuples={[streamedTrackTuple]}>{children}</StoreProvider>,
        });

        const playbackState = result.current(contextUri);
        expect(playbackState).toBe("playing");
    });
});
