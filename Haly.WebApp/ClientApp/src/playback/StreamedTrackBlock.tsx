import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai/index";
import React from "react";
import isDeepEqual from "react-fast-compare";

import { StreamedTrackDto } from "../common/atoms/playbackAtoms";
import { likedSongIdByPlaybackIdAtom } from "../common/atoms/trackAtoms";
import halyClient from "../halyClient";
import { TrackLikedState } from "../table/useTableRowLikedState";
import HeartButton from "../ui/HeartButton";
import StreamedTrack from "./StreamedTrack";

type StreamedTrackBlockProps = {
    streamedTrack: StreamedTrackDto;
};

function StreamedTrackBlock({ streamedTrack }: StreamedTrackBlockProps) {
    const likedSongIdByPlaybackId = useAtomValue(likedSongIdByPlaybackIdAtom);
    const likedSongId = likedSongIdByPlaybackId[streamedTrack.playbackId];
    const likedState: TrackLikedState = {
        likedId: likedSongId ?? streamedTrack.playbackId,
        isLiked: Boolean(likedSongId),
    };

    const contextId = streamedTrack.context?.id ?? "";
    const query = useQuery(
        [
            "search",
            "playback",
            {
                playlistId: contextId,
                playbackId: streamedTrack.playbackId,
            },
        ],
        () =>
            halyClient.search.searchCacheUsingPlaybackData({
                playlistId: contextId,
                trackPlaybackId: streamedTrack.playbackId,
            }),
        {
            retry: false,
        },
    );
    const foundId = query.data?.track?.id;

    return (
        <div>
            <StreamedTrack track={streamedTrack} likedState={likedState} foundTrackId={foundId} />

            <HeartButton
                key={streamedTrack.playbackId}
                params={{
                    type: "track",
                    ids: [
                        {
                            likedId: likedState.likedId!,
                            playbackId: streamedTrack.playbackId,
                        },
                    ],
                }}
                state={likedState.isLiked}
            />
        </div>
    );
}

export default React.memo(StreamedTrackBlock, isDeepEqual);
