import { useQueryClient } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { useEffect } from "react";

import { streamedTrackAtom } from "../common/atoms";
import { delay } from "../common/delay";
import { GetQueueQueryKey, GetRecentlyPlayedQueryKey } from "../common/queryKeys";
import ConnectBar from "./ConnectBar";
import PlaybackControls from "./PlaybackControls";
import usePlaybackTransferFlow from "./usePlaybackTransferFlow";

type PlaybackProps = {
    deviceId: string;
};

function Playback({ deviceId }: PlaybackProps) {
    const queryClient = useQueryClient();
    const streamedTrack = useAtomValue(streamedTrackAtom);
    const { state, activeDevice, volume, transferPlayback, refetchPlaybackState, retry } =
        usePlaybackTransferFlow(deviceId);

    useEffect(() => {
        if (streamedTrack?.spotifyId) {
            // We need to delay this, otherwise those endpoints won't notice the change.
            delay(800).then(() => {
                console.log("invalidation");
                queryClient.invalidateQueries(GetQueueQueryKey);
                queryClient.invalidateQueries(GetRecentlyPlayedQueryKey);
            });
        }
    }, [streamedTrack?.spotifyId, queryClient]);

    if (state === "initial" || state === "scheduled") return null;

    if (state === "query-failure") {
        return (
            <ConnectBar
                type="failure"
                errorMessage="No playback information available"
                onAction={refetchPlaybackState}
            />
        );
    }

    if (state === "transfer-failure") {
        return <ConnectBar type="failure" errorMessage="Playback transfer failed" onAction={retry} />;
    }

    if (state === "available") {
        return <ConnectBar type="available" activeDeviceName={activeDevice?.name} onAction={transferPlayback} />;
    }

    if (state === "connecting") {
        return <ConnectBar type="connecting" />;
    }

    return <PlaybackControls track={streamedTrack} initialVolume={volume} />;
}

export default Playback;
