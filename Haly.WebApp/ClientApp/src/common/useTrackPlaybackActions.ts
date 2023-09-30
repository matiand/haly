import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";

import { PutPlaybackRequest, TrackDto } from "../../generated/haly";
import halyClient from "../halyClient";
import { PlaybackContextState } from "./usePlaybackContextState";

type TrackUri = TrackDto["uri"];

type TogglePlaybackMutationParam = {
    playbackState: PlaybackContextState;
};

type UpdatePlaybackMutationParam = {
    contextUri: string;
    trackUri: TrackUri;
};

function useTrackPlaybackActions(contextUri: string, trackUri: TrackUri, playbackState: PlaybackContextState) {
    const togglePlaybackMutation = useMutation(({ playbackState }: TogglePlaybackMutationParam) => {
        return playbackState === "playing" ? halyClient.player.pause() : halyClient.player.play();
    });

    const updatePlaybackMutation = useMutation(({ contextUri, trackUri }: UpdatePlaybackMutationParam) => {
        const body: PutPlaybackRequest = {
            contextUri,
            trackUri: trackUri!,
        };

        console.log("updatePlayback", contextUri, trackUri);
        return halyClient.player.putPlayback({ putPlaybackRequest: body });
    });

    const togglePlayback = useCallback(
        () => togglePlaybackMutation.mutate({ playbackState }),
        [playbackState, togglePlaybackMutation],
    );

    const updatePlayback = useCallback(
        () =>
            updatePlaybackMutation.mutate({
                contextUri,
                trackUri,
            }),
        [contextUri, trackUri, updatePlaybackMutation],
    );

    return {
        // Don't allow playback of local tracks.
        togglePlayback: trackUri ? togglePlayback : undefined,
        updatePlayback: trackUri ? updatePlayback : undefined,
    };
}

export default useTrackPlaybackActions;
