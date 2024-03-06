import { useAtomValue } from "jotai";
import { useCallback } from "react";

import { TrackDto } from "../../generated/haly";
import { pageContextUriAtom } from "../common/atoms/pageAtoms";
import { isTrackPausedAtom, playbackUriAtom, streamedPlaybackIdAtom } from "../common/atoms/playbackAtoms";

// You might notice that this type has the same values as ContextPlaybackState. This is just a
// coincidence and it may change in future.
export type TrackPlaybackState = "playing" | "paused" | "none";

function useTableRowPlaybackState() {
    const pageContextUri = useAtomValue(pageContextUriAtom);
    const playbackUri = useAtomValue(playbackUriAtom);
    const streamedTrackPlaybackId = useAtomValue(streamedPlaybackIdAtom);
    const isPaused = useAtomValue(isTrackPausedAtom);

    return useCallback(
        (trackPlaybackId: TrackDto["playbackId"]): TrackPlaybackState => {
            if (pageContextUri !== playbackUri || !trackPlaybackId) return "none";

            if (streamedTrackPlaybackId === trackPlaybackId) return isPaused ? "paused" : "playing";

            return "none";
        },
        [pageContextUri, playbackUri, streamedTrackPlaybackId, isPaused],
    );
}

export default useTableRowPlaybackState;
