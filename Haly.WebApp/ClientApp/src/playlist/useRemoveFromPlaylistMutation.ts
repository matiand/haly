import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { RemoveTracksRequest } from "../../generated/haly";
import { GetMyPlaylistsQueryKey } from "../common/queryKeys";
import halyClient from "../halyClient";

export type RemoveFromPlaylistMutationParams = {
    playlistId: string;
    tracks: RemoveTracksRequest["tracks"];
};

function useRemoveFromPlaylistMutation() {
    const queryClient = useQueryClient();

    return useMutation(
        async (params: RemoveFromPlaylistMutationParams) => {
            await halyClient.playlists.removeTracks({
                playlistId: params.playlistId,
                removeTracksRequest: {
                    tracks: params.tracks,
                },
            });

            return params;
        },
        {
            onSuccess: (params) => {
                // By invalidating this query, our backend will look for any changes in our playlists.
                queryClient.invalidateQueries(GetMyPlaylistsQueryKey);

                toast(`${params.tracks.length === 1 ? "Track" : "Tracks"} removed.`);
            },
        },
    );
}

export default useRemoveFromPlaylistMutation;
