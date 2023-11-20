import { MenuItem } from "@szhsin/react-menu";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { RemoveTracksRequest } from "../../../generated/haly";
import { GetPlaylistQueryKey } from "../../common/queryKeys";
import halyClient from "../../halyClient";

export type RemoveFromPlaylistMutationParams = {
    playlistId: string;
    tracks: RemoveTracksRequest["tracks"];
};

type RemoveFromPlaylistMenuItemProps = {
    params: RemoveFromPlaylistMutationParams;
};

function RemoveFromPlaylistMenuItem({ params }: RemoveFromPlaylistMenuItemProps) {
    const queryClient = useQueryClient();
    const removeFromPlaylist = useMutation(
        (params: RemoveFromPlaylistMutationParams) =>
            halyClient.playlists
                .removeTracks({
                    playlistId: params.playlistId,
                    removeTracksRequest: {
                        tracks: params.tracks,
                    },
                })
                .then(() => params),
        {
            onSuccess: (params) => {
                queryClient.invalidateQueries(GetPlaylistQueryKey(params.playlistId));
                toast("Tracks removed.");
            },
        },
    );

    return <MenuItem onClick={() => removeFromPlaylist.mutate(params)}>Remove from this playlist</MenuItem>;
}

export default RemoveFromPlaylistMenuItem;
