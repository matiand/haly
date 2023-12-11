import { useAtomValue } from "jotai";
import { useCallback } from "react";

import { TrackDto } from "../../generated/haly";
import { pageContextUriAtom } from "../common/atoms/pageAtoms";
import { isTrackPausedAtom, playbackContextUriAtom, streamedTrackIdAtom } from "../common/atoms/playbackAtoms";

// You might notice that this type has the same values as ContextPlaybackState. This is just a
// coincidence and it may change in future.
export type TrackPlaybackState = "playing" | "paused" | "none";

function useTableRowPlaybackState() {
    const pageContextUri = useAtomValue(pageContextUriAtom);
    const playbackContextUri = useAtomValue(playbackContextUriAtom);
    const streamedTrackId = useAtomValue(streamedTrackIdAtom);
    const isPaused = useAtomValue(isTrackPausedAtom);

    return useCallback(
        (trackId: TrackDto["id"]): TrackPlaybackState => {
            if (pageContextUri !== playbackContextUri || !trackId) return "none";

            if (streamedTrackId === trackId) return isPaused ? "paused" : "playing";

            return "none";
        },
        [pageContextUri, playbackContextUri, streamedTrackId, isPaused],
    );
}

export default useTableRowPlaybackState;
