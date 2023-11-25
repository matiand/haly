import { MenuItem } from "@szhsin/react-menu";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { GetPlaylistQueryKey } from "../../common/queryKeys";
import halyClient from "../../halyClient";

type ForcePlaylistSyncMenuItemProps = {
    id: string;
    isLikedSongsCollection?: boolean;
};

function ForcePlaylistSyncMenuItem({ id, isLikedSongsCollection }: ForcePlaylistSyncMenuItemProps) {
    const queryClient = useQueryClient();
    const forcePlaylistSync = useMutation(() => halyClient.playlists.putPlaylist({ id, forceUpdate: true }), {
        onSuccess: () => {
            queryClient.invalidateQueries(GetPlaylistQueryKey(id));
            toast("Playlist synced.");
        },
    });

    return <MenuItem onClick={() => forcePlaylistSync.mutate()}>Force playlist sync</MenuItem>;
}

export default ForcePlaylistSyncMenuItem;
