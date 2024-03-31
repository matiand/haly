import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { RemoveTracksRequest } from "../../generated/haly";
import { GetPlaylistQueryKey } from "../common/queryKeys";
import halyClient from "../halyClient";
import { showToastOnProblem } from "../queryClient";
import ToastWithImage from "../ui/ToastWithImage";

export type MoveToPlaylistMenuItemParams = {
    fromPlaylistId: string;
    toPlaylistId: string;
    tracks: RemoveTracksRequest["tracks"];
};

function useMoveToPlaylistMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (params: MoveToPlaylistMenuItemParams) => {
            const removeTask = halyClient.playlists.removeTracks({
                playlistId: params.fromPlaylistId,
                removeTracksRequest: {
                    tracks: params.tracks,
                },
            });
            const addTask = halyClient.playlists.addTracks({
                playlistId: params.toPlaylistId,
                addTracksRequest: {
                    trackUris: params.tracks.map((t) => t.uri),
                    duplicatesStrategy: "AddAll",
                },
            });

            return await Promise.all([removeTask, addTask]);
        },
        onSuccess: ([removed, added]) => {
            queryClient.invalidateQueries({ queryKey: GetPlaylistQueryKey(removed.id) });
            halyClient.jobs.refetchCurrentUserPlaylistTracks();

            toast(
                <ToastWithImage imageUrl={added.thumbnailUrl}>
                    Moved to <b>{added.name}</b>
                </ToastWithImage>,
            );
        },
        onError: showToastOnProblem,
    });
}

export default useMoveToPlaylistMutation;
