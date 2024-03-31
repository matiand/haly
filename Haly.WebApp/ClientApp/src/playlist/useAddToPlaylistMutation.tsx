import { useMutation } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import toast from "react-hot-toast";

import { DuplicateProblem, DuplicatesStrategy, Problem, ResponseError } from "../../generated/haly";
import { modalAtom } from "../common/atoms/modalAtoms";
import halyClient from "../halyClient";
import ToastWithImage from "../ui/ToastWithImage";

type AddToPlaylistMutationParams = {
    playlistId: string;
    collectionUri?: string;
    trackUris?: string[];
    duplicatesStrategy: DuplicatesStrategy;
};

function useAddToPlaylistMutation() {
    const setModal = useSetAtom(modalAtom);

    const addToPlaylist = useMutation({
        mutationFn: ({ playlistId, collectionUri, trackUris, duplicatesStrategy }: AddToPlaylistMutationParams) =>
            halyClient.playlists.addTracks({
                playlistId,
                addTracksRequest: {
                    trackUris,
                    collectionUri,
                    duplicatesStrategy,
                },
            }),
        onSuccess: (response) => {
            halyClient.jobs.refetchCurrentUserPlaylistTracks();

            toast(
                <ToastWithImage imageUrl={response.thumbnailUrl}>
                    Added to <b>{response.name}</b>
                </ToastWithImage>,
            );
        },
        onError: async (err, { collectionUri, trackUris }) => {
            if (err instanceof ResponseError && err.response.status === 404) {
                toast("No tracks to add.");
                return;
            }

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
                return;
            }

            if (err instanceof ResponseError) {
                const problem: Problem = await err.response.json();
                toast.error(problem.title);
            }
        },
    });

    return addToPlaylist;
}

export default useAddToPlaylistMutation;
