import { useAtomValue } from "jotai";
import { useCallback } from "react";

import { TrackDto } from "../../generated/haly";
import { likedSongIdByPlaybackIdAtom } from "../common/atoms/trackAtoms";

export type TrackLikedState = {
    likedId: TrackDto["id"] | TrackDto["playbackId"];
    isLiked: boolean;
};

function useTableRowLikedState() {
    const likedSongIdByPlaybackId = useAtomValue(likedSongIdByPlaybackIdAtom);

    return useCallback(
        (id: TrackDto["id"], playbackId: TrackDto["playbackId"]): TrackLikedState => {
            const likedSongId = likedSongIdByPlaybackId[playbackId ?? ""];

            return {
                likedId: likedSongId ?? id,
                isLiked: Boolean(likedSongId),
            };
        },
        [likedSongIdByPlaybackId],
    );
}

export default useTableRowLikedState;
