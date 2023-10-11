import { useMutation } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { useCallback } from "react";

import { PutPlaybackRequest, TrackDto } from "../../generated/haly";
import halyClient from "../halyClient";
import { ContextPlaybackState } from "./useContextPlaybackState";
import { TrackPlaybackState } from "../table/useTableRowPlaybackState";
import { pageContextUriAtom } from "../common/atoms";

type TrackUri = TrackDto["uri"];

export function useTrackPlaybackActions(state: TrackPlaybackState, track: TrackDto) {
    const { togglePlayback, updatePlayback } = usePlaybackActions(state, track.uri);

    // Don't allow playback of local tracks and podcasts.
    if (!track.uri || !track.isSong) {
        return {
            togglePlayback: undefined,
            updatePlayback: undefined,
        };
    }

    return {
        togglePlayback,
        updatePlayback,
    };
}

export function useContextPlaybackActions(state: ContextPlaybackState) {
    const { togglePlayback, updatePlayback } = usePlaybackActions(state);

    return {
        togglePlayback,
        updatePlayback,
    };
}

type TogglePlaybackMutationParam = {
    state: ContextPlaybackState | TrackPlaybackState;
};

type UpdatePlaybackMutationParam = {
    contextUri: string;
    trackUri: TrackUri;
};

function usePlaybackActions(state: ContextPlaybackState | TrackPlaybackState, trackUri?: TrackUri) {
    const contextUri = useAtomValue(pageContextUriAtom);

    const togglePlaybackMutation = useMutation(({ state }: TogglePlaybackMutationParam) => {
        return state === "playing" ? halyClient.player.pause() : halyClient.player.play();
    });

    const updatePlaybackMutation = useMutation(({ contextUri, trackUri }: UpdatePlaybackMutationParam) => {
        const body: PutPlaybackRequest = {
            contextUri,
            trackUri,
        };

        console.log("updatePlayback", contextUri, trackUri);
        return halyClient.player.putPlayback({ putPlaybackRequest: body });
    });

    const togglePlayback = useCallback(() => togglePlaybackMutation.mutate({ state }), [state, togglePlaybackMutation]);

    const updatePlayback = useCallback(
        () =>
            updatePlaybackMutation.mutate({
                contextUri,
                trackUri,
            }),
        [contextUri, trackUri, updatePlaybackMutation],
    );

    return {
        togglePlayback: state !== "none" ? togglePlayback : updatePlayback,
        updatePlayback,
    };
}

export default usePlaybackActions;
