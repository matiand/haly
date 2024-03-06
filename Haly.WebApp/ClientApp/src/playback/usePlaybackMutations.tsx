import { useMutation } from "@tanstack/react-query";
import { useAtomValue } from "jotai/index";
import { useCallback } from "react";
import toast from "react-hot-toast";

import { AlbumTrackDto, Problem, ResponseError, TrackDto } from "../../generated/haly";
import { pageContextUriAtom } from "../common/atoms/pageAtoms";
import { persistedWithImprovedShuffleAtom } from "../common/atoms/playbackAtoms";
import halyClient from "../halyClient";
import { TrackPlaybackState } from "../table/useTableRowPlaybackState";
import { ContextPlaybackState } from "./useContextPlaybackState";

/**
 * Start a new playback context.
 */
export function useContextPlayback({ contextUri, playbackState }: UseContextPlaybackParams) {
    const { togglePlayback, updatePlayback } = useBaseMutations({
        playbackState,
        contextUri,
    });

    return {
        togglePlayback: playbackState !== "none" ? togglePlayback : updatePlayback,
        updatePlayback,
    };
}

/**
 * Start a new playback context. Begins with given track.
 */
export function useTrackPlayback({ track, trackPlaybackState, contextUriOverride }: UseTrackPlaybackParams) {
    const contextUri = useAtomValue(pageContextUriAtom);

    const { togglePlayback, updatePlayback } = useBaseMutations({
        playbackState: trackPlaybackState,
        contextUri: contextUri || contextUriOverride,
        trackUri: track.uri,
    });

    const isPodcast = "isSong" in track && !track.isSong;
    // Don't allow playback of local tracks and podcasts.
    if (isPodcast || !track.uri) {
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
        togglePlayback: trackPlaybackState !== "none" ? togglePlayback : updatePlayback,
        updatePlayback,
    };
}

/**
 * Start a playback of a single track.
 */
export function useSingleTrackPlayback({ track, trackPlaybackState }: UseSingleTrackPlaybackParams) {
    const { togglePlayback, updatePlayback } = useBaseMutations({
        playbackState: trackPlaybackState,
        trackUri: track.uri,
    });

    // Don't allow playback of local tracks.
    if (!track.uri) {
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
        togglePlayback: trackPlaybackState !== "none" ? togglePlayback : updatePlayback,
        updatePlayback,
    };
}

function useBaseMutations({ playbackState, contextUri, trackUri }: UseBaseMutationsParams) {
    const withImprovedShuffle = useAtomValue(persistedWithImprovedShuffleAtom);

    const togglePlaybackMutation = useMutation(async ({ playbackState }: TogglePlaybackParams) =>
        playbackState === "playing" ? await halyClient.player.pause() : await halyClient.player.play(),
    );

    const updatePlaybackMutation = useMutation(
        async ({ contextUri, trackUri, withImprovedShuffle }: UpdatePlaybackParams) => {
            try {
                await halyClient.player.putPlayback({
                    putPlaybackRequest: {
                        contextUri,
                        trackUri,
                        withImprovedShuffle,
                    },
                });
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

    return {
        togglePlayback: useCallback(
            () => togglePlaybackMutation.mutate({ playbackState: playbackState }),
            [playbackState, togglePlaybackMutation],
        ),
        updatePlayback: useCallback(
            () =>
                updatePlaybackMutation.mutate({
                    contextUri,
                    trackUri,
                    withImprovedShuffle,
                }),
            [contextUri, trackUri, updatePlaybackMutation, withImprovedShuffle],
        ),
    };
}

type UseContextPlaybackParams = {
    contextUri: string;
    playbackState: ContextPlaybackState;
};

type UseTrackPlaybackParams = {
    track: TrackDto | AlbumTrackDto;
    trackPlaybackState: TrackPlaybackState;
    /**
     * The page context uri is used by default, use this to override it.
     */
    contextUriOverride?: string;
};

type UseSingleTrackPlaybackParams = {
    track: TrackDto;
    trackPlaybackState: TrackPlaybackState;
};

type UseBaseMutationsParams = {
    playbackState: ContextPlaybackState | TrackPlaybackState;
    contextUri?: string;
    trackUri?: TrackDto["uri"];
};

type TogglePlaybackParams = {
    playbackState: ContextPlaybackState | TrackPlaybackState;
};

type UpdatePlaybackParams =
    | {
          contextUri: string;
          trackUri?: TrackDto["uri"];
          withImprovedShuffle: boolean;
      }
    | {
          contextUri?: string;
          trackUri: TrackDto["uri"];
          withImprovedShuffle: boolean;
      };
