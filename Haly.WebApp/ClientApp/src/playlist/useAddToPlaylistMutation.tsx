import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";

import { DuplicateProblem, DuplicatesStrategy, instanceOfPlaylistBriefDto, ResponseError } from "../../generated/haly";
import halyClient from "../halyClient";
import ToastWithImage from "../ui/ToastWithImage";

type AddToPlaylistMutationParams = {
    playlistId: string;
    collectionUri?: string;
    trackUris?: string[];
    duplicatesStrategy: DuplicatesStrategy;
};

function useAddToPlaylistMutation() {
    const [problem, setProblem] = useState<DuplicateProblem | null>(null);

    const addToPlaylist = useMutation(
        async ({ playlistId, collectionUri, trackUris, duplicatesStrategy }: AddToPlaylistMutationParams) => {
            try {
                return halyClient.playlists.addTracks({
                    playlistId,
                    addTracksRequest: {
                        trackUris,
                        collectionUri,
                        duplicatesStrategy,
                    },
                });
            } catch (e) {
                // todo: when testing error handling, check if 404 is caught automatically or do we need to catch it manually
                if (e instanceof ResponseError && e.response.status === 409) {
                    const problem: DuplicateProblem = await e.response.json();
                    return problem;
                }

                throw e;
            }
        },
        {
            onSuccess: (response) => {
                // Check if it's playlist.
                if ("id" in response) {
                    toast(
                        <ToastWithImage imageUrl={response.imageUrl}>
                            Added to <b>{response.name}</b>
                        </ToastWithImage>,
                    );
                } else {
                    setProblem(response);
                }
            },
        },
    );

    return {
        addToPlaylist,
        problem,
        clearProblem: () => setProblem(null),
    };
}

export default useAddToPlaylistMutation;
