import { useMutation, useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";

import { streamedTrackAtom } from "../common/atoms/playbackAtoms";
import halyClient from "../halyClient";

type PlaybackTransferState =
    | "initial"
    | "query-failure"
    | "transfer-failure"
    | "available"
    | "scheduled"
    | "connecting"
    | "accepted"
    | "success";

function usePlaybackTransferFlow(deviceId: string) {
    const streamedTrack = useAtomValue(streamedTrackAtom);
    const [transferState, setTransferState] = useState<PlaybackTransferState>("initial");
    const [volume, setVolume] = useState(0.5);

    const query = useQuery(["me", "player"], () => getPlaybackState(), {
        refetchOnWindowFocus: "always",
        enabled: transferState === "initial" || transferState === "query-failure" || transferState === "available",
    });

    const transferPlayback = useMutation(
        (ourDeviceId: string) => {
            setTransferState("connecting");
            return halyClient.player.transferPlayback({ deviceId: ourDeviceId });
        },
        {
            onSuccess: () => {
                setTransferState("accepted");
            },
            onError: () => {
                setTransferState("transfer-failure");
            },
        },
    );

    console.log("transfer: (query success)", transferState, query.isSuccess);

    useEffect(() => {
        if (query.isError && transferState === "initial") {
            setTransferState("query-failure");
            return;
        }

        if (query.isSuccess && (transferState === "initial" || transferState === "query-failure")) {
            if (!query.data) {
                setTransferState("scheduled");
            } else {
                setTransferState("available");
                setVolume(query.data.device.volume);
            }
            return;
        }
    }, [query, transferState]);

    useEffect(() => {
        if (transferState === "scheduled" && transferPlayback.isIdle) {
            transferPlayback.mutate(deviceId);
        }
    }, [deviceId, transferState, transferPlayback]);

    useEffect(() => {
        if (streamedTrack && transferState !== "success") {
            setTransferState("success");
        }

        // When playback was transferred to another device.
        if (!streamedTrack && transferState === "success") {
            setTransferState("available");
        }
    }, [streamedTrack, transferState, setTransferState]);

    return {
        state: transferState,
        activeDevice: query.data?.device,
        volume,
        refetchPlaybackState: () => query.refetch(),
        transferPlayback: () => transferPlayback.mutate(deviceId),
        retry: () => {
            // Query will be refetched automatically, because we change transferState to initial.
            setTransferState("initial");
            transferPlayback.reset();
        },
    };
}

async function getPlaybackState() {
    try {
        return await halyClient.player.getPlaybackState();
    } catch (err) {
        if (!err || typeof err !== "object") throw err;

        const nobodyIsStreamingResponse = "status" in err && err.status === 204;
        if (nobodyIsStreamingResponse) {
            return null;
        }

        throw err;
    }
}

export default usePlaybackTransferFlow;
