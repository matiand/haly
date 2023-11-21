import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSetAtom } from "jotai/index";
import toast from "react-hot-toast";

import { DuplicateProblem, DuplicatesStrategy, ResponseError } from "../../generated/haly";
import { GetMyPlaylistsQueryKey } from "../common/queryKeys";
import halyClient from "../halyClient";
import modalAtom from "../menus/modals/modalAtom";
import ToastWithImage from "../ui/ToastWithImage";

type AddToPlaylistMutationParams = {
    playlistId: string;
    collectionUri?: string;
    trackUris?: string[];
    duplicatesStrategy: DuplicatesStrategy;
};

function useAddToPlaylistMutation() {
    const queryClient = useQueryClient();
    const setModal = useSetAtom(modalAtom);

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

                    return {
                        problem,
                        playlistId,
                        collectionUri,
                        trackUris,
                    };
                }

                throw e;
            }
        },
        {
            onSuccess: (response) => {
                // Check if it's a playlist.
                if ("id" in response) {
                    toast(
                        <ToastWithImage imageUrl={response.imageUrl}>
                            Added to <b>{response.name}</b>
                        </ToastWithImage>,
                    );

                    // This will cause our playlist cache to be updated.
                    queryClient.invalidateQueries(GetMyPlaylistsQueryKey);
                } else {
                    // Otherwise response is a DuplicateProblem
                    const { problem, playlistId, collectionUri, trackUris } = response;
                    setModal({
                        type: "duplicateTracksProblem",
                        props: {
                            problem,
                            onAccept: (strategy: DuplicatesStrategy) => {
                                addToPlaylist.mutate({
                                    playlistId,
                                    collectionUri,
                                    trackUris,
                                    duplicatesStrategy: strategy,
                                });

                                setModal(null);
                            },
                            onCancel: () => {
                                setModal(null);
                            },
                        },
                    });
                }
            },
        },
    );

    return {
        addToPlaylist,
    };
}

export default useAddToPlaylistMutation;
