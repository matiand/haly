import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { RemoveTracksRequest } from "../../generated/haly";
import { GetMyPlaylistsQueryKey } from "../common/queryKeys";
import halyClient from "../halyClient";
import ToastWithImage from "../ui/ToastWithImage";

export type MoveToPlaylistMenuItemParams = {
    fromPlaylistId: string;
    toPlaylistId: string;
    tracks: RemoveTracksRequest["tracks"];
};

function useMoveToPlaylistMutation() {
    const queryClient = useQueryClient();

    return useMutation(
        async (params: MoveToPlaylistMenuItemParams) => {
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

            const [, addResponse] = await Promise.all([removeTask, addTask]);

            return addResponse;
        },
        {
            onSuccess: (response) => {
                // By invalidating this query, our backend will look for any changes in our playlists.
                queryClient.invalidateQueries(GetMyPlaylistsQueryKey);

                toast(
                    <ToastWithImage imageUrl={response.thumbnailUrl}>
                        Moved to <b>{response.name}</b>
                    </ToastWithImage>,
                );
            },
        },
    );
}

export default useMoveToPlaylistMutation;
