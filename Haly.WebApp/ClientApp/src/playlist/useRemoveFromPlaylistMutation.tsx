import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { RemoveTracksRequest } from "../../generated/haly";
import { GetMyPlaylistsQueryKey } from "../common/queryKeys";
import halyClient from "../halyClient";
import ToastWithImage from "../ui/ToastWithImage";

export type RemoveFromPlaylistMutationParams = {
    playlistId: string;
    tracks: RemoveTracksRequest["tracks"];
};

function useRemoveFromPlaylistMutation() {
    const queryClient = useQueryClient();

    return useMutation(
        async (params: RemoveFromPlaylistMutationParams) => {
            return await halyClient.playlists.removeTracks({
                playlistId: params.playlistId,
                removeTracksRequest: {
                    tracks: params.tracks,
                },
            });
        },
        {
            onSuccess: ({ name, thumbnailUrl }) => {
                // By invalidating this query, our backend will look for any changes in our playlists.
                queryClient.invalidateQueries(GetMyPlaylistsQueryKey);

                toast(
                    <ToastWithImage imageUrl={thumbnailUrl}>
                        Removed from <b>{name}</b>
                    </ToastWithImage>,
                );
            },
        },
    );
}

export default useRemoveFromPlaylistMutation;
