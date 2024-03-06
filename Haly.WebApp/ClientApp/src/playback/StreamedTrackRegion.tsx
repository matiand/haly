import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai/index";
import React from "react";
import isDeepEqual from "react-fast-compare";

import { StreamedTrackDto } from "../common/atoms/playbackAtoms";
import { likedSongIdByPlaybackIdAtom } from "../common/atoms/trackAtoms";
import halyClient from "../halyClient";
import { TrackLikedState } from "../table/useTableRowLikedState";
import HeartButton from "../ui/HeartButton";
import NowPlayingAnnouncement from "./NowPlayingAnnouncement";
import StreamedTrackBlock from "./StreamedTrackBlock";

type StreamedTrackRegionProps = {
    streamedTrack: StreamedTrackDto;
};

function StreamedTrackRegion({ streamedTrack }: StreamedTrackRegionProps) {
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
            enabled: Boolean(contextId),
            retry: false,
        },
    );
    const foundId = query.data?.track?.id;

    return (
        <div>
            <StreamedTrackBlock track={streamedTrack} likedState={likedState} foundTrackId={foundId} />

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

            <NowPlayingAnnouncement title={streamedTrack.name} artists={streamedTrack.artists} />
        </div>
    );
}

export default React.memo(StreamedTrackRegion, isDeepEqual);
