import { useMutation } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { useCallback } from "react";
import toast from "react-hot-toast";

import { AlbumTrackDto, Problem, PutPlaybackRequest, ResponseError, TrackDto } from "../../generated/haly";
import { pageContextUriAtom } from "../common/atoms/pageAtoms";
import { persistedWithImprovedShuffleAtom } from "../common/atoms/playbackAtoms";
import halyClient from "../halyClient";
import { TrackPlaybackState } from "../table/useTableRowPlaybackState";
import { ContextPlaybackState } from "./useContextPlaybackState";

type TrackUri = TrackDto["uri"];

export function useTrackPlaybackActions(
    state: TrackPlaybackState,
    track: TrackDto | AlbumTrackDto,
    contextUri?: string,
) {
    const { togglePlayback, updatePlayback } = useBasePlaybackActions({ state, trackUri: track.uri, contextUri });

    const isPodcast = "isSong" in track && !track.isSong;
    // Don't allow playback of local tracks and podcasts.
    if (!track.uri || isPodcast) {
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
        togglePlayback: state !== "none" ? togglePlayback : updatePlayback,
        updatePlayback,
    };
}

export function useContextPlaybackActions(state: ContextPlaybackState, contextUri?: string) {
    const { togglePlayback, updatePlayback } = useBasePlaybackActions({ state, contextUri });

    return {
        playbackAction: state !== "none" ? togglePlayback : updatePlayback,
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

type BaseHookParams = {
    state: ContextPlaybackState | TrackPlaybackState;
    trackUri?: TrackUri;
    contextUri?: string;
};

function useBasePlaybackActions({ state, trackUri, contextUri }: BaseHookParams) {
    const pageContextUri = useAtomValue(pageContextUriAtom);
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
                contextUri: contextUri ?? pageContextUri,
                trackUri,
                withImprovedShuffle,
            }),
        [contextUri, pageContextUri, trackUri, updatePlaybackMutation, withImprovedShuffle],
    );

    return {
        togglePlayback,
        updatePlayback,
    };
}
