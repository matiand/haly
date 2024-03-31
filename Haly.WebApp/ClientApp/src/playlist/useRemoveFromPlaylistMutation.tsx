import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { RemoveTracksRequest } from "../../generated/haly";
import { GetPlaylistQueryKey } from "../common/queryKeys";
import halyClient from "../halyClient";
import { showToastOnProblem } from "../queryClient";
import ToastWithImage from "../ui/ToastWithImage";

export type RemoveFromPlaylistMutationParams = {
    playlistId: string;
    tracks: RemoveTracksRequest["tracks"];
};

function useRemoveFromPlaylistMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (params: RemoveFromPlaylistMutationParams) => {
            return await halyClient.playlists.removeTracks({
                playlistId: params.playlistId,
                removeTracksRequest: {
                    tracks: params.tracks,
                },
            });
        },
        onSuccess: ({ id, name, thumbnailUrl }) => {
            queryClient.invalidateQueries({ queryKey: GetPlaylistQueryKey(id) });
            halyClient.jobs.refetchCurrentUserPlaylistTracks();

            toast(
                <ToastWithImage imageUrl={thumbnailUrl}>
                    Removed from <b>{name}</b>
                </ToastWithImage>,
            );
        },
        onError: showToastOnProblem,
    });
}

export default useRemoveFromPlaylistMutation;
