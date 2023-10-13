import { useMutation } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { useCallback } from "react";
import toast from "react-hot-toast";

import { Problem, PutPlaybackRequest, ResponseError, TrackDto } from "../../generated/haly";
import { pageContextUriAtom, persistedWithImprovedShuffleAtom } from "../common/atoms";
import halyClient from "../halyClient";
import { TrackPlaybackState } from "../table/useTableRowPlaybackState";
import { ContextPlaybackState } from "./useContextPlaybackState";

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

    if (!track.isPlayable) {
        return {
            togglePlayback: () => toast("This content is not available."),
            updatePlayback: () => toast("This content is not available."),
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
    withImprovedShuffle: boolean;
};

function usePlaybackActions(state: ContextPlaybackState | TrackPlaybackState, trackUri?: TrackUri) {
    const contextUri = useAtomValue(pageContextUriAtom);
    const withImprovedShuffle = useAtomValue(persistedWithImprovedShuffleAtom);

    const togglePlaybackMutation = useMutation(({ state }: TogglePlaybackMutationParam) => {
        return state === "playing" ? halyClient.player.pause() : halyClient.player.play();
    });

    const updatePlaybackMutation = useMutation(
        async ({ contextUri, trackUri, withImprovedShuffle }: UpdatePlaybackMutationParam) => {
            const body: PutPlaybackRequest = {
                contextUri,
                trackUri,
                withImprovedShuffle,
            };

            try {
                return await halyClient.player.putPlayback({ putPlaybackRequest: body });
            } catch (e) {
                if (e instanceof ResponseError && e.response.status === 404) {
                    const problem: Problem = await e.response.json();
                    toast(problem.title);

                    return;
                }
                throw e;
            }
        },
    );

    const togglePlayback = useCallback(() => togglePlaybackMutation.mutate({ state }), [state, togglePlaybackMutation]);

    const updatePlayback = useCallback(
        () =>
            updatePlaybackMutation.mutate({
                contextUri,
                trackUri,
                withImprovedShuffle,
            }),
        [contextUri, trackUri, updatePlaybackMutation, withImprovedShuffle],
    );

    return {
        togglePlayback: state !== "none" ? togglePlayback : updatePlayback,
        updatePlayback,
    };
}
