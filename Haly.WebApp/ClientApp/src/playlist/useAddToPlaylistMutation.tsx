import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import toast from "react-hot-toast";

import { DuplicateProblem, DuplicatesStrategy, ResponseError } from "../../generated/haly";
import { modalAtom } from "../common/atoms/modalAtoms";
import { GetMyPlaylistsQueryKey } from "../common/queryKeys";
import halyClient from "../halyClient";
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
        ({ playlistId, collectionUri, trackUris, duplicatesStrategy }: AddToPlaylistMutationParams) =>
            halyClient.playlists.addTracks({
                playlistId,
                addTracksRequest: {
                    trackUris,
                    collectionUri,
                    duplicatesStrategy,
                },
            }),
        {
            onSuccess: (response) => {
                toast(
                    <ToastWithImage imageUrl={response.imageUrl}>
                        Added to <b>{response.name}</b>
                    </ToastWithImage>,
                );

                // This will cause our playlist cache to be updated.
                queryClient.invalidateQueries(GetMyPlaylistsQueryKey);
            },
            onError: async (err, { collectionUri, trackUris }) => {
                // todo: when testing error handling, check if 404 is caught automatically or do we need to catch it manually
                if (err instanceof ResponseError && err.response.status === 409) {
                    const problem: DuplicateProblem = await err.response.json();

                    setModal({
                        type: "duplicateTracksProblem",
                        props: {
                            problem,
                            onAccept: (strategy: DuplicatesStrategy) => {
                                addToPlaylist.mutate({
                                    playlistId: problem.playlistId,
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
