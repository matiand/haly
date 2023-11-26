import { MenuItem } from "@szhsin/react-menu";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import toast from "react-hot-toast";

import { isLikedSongsCollectionChangedAtom } from "../../common/atoms/trackAtoms";
import { GetPlaylistQueryKey } from "../../common/queryKeys";
import halyClient from "../../halyClient";

type ForcePlaylistSyncMenuItemProps = {
    id: string;
    isLikedSongsCollection?: boolean;
};

function ForcePlaylistSyncMenuItem({ id, isLikedSongsCollection = false }: ForcePlaylistSyncMenuItemProps) {
    const setIsLikedSongsCollectionChanged = useSetAtom(isLikedSongsCollectionChangedAtom);
    const queryClient = useQueryClient();

    const forcePlaylistSync = useMutation(
        async (isLikedSongs: boolean) => {
            if (isLikedSongs) {
                setIsLikedSongsCollectionChanged(true);
            } else {
                await halyClient.playlists.putPlaylist({
                    id,
                    forceUpdate: true,
                });
            }

            return isLikedSongs;
        },
        {
            onSuccess: (isLikedSongs) => {
                // Liked songs are managed by useLikedSongsManagement hook.
                if (!isLikedSongs) {
                    queryClient.invalidateQueries(GetPlaylistQueryKey(id));
                }

                toast("Playlist synced.");
            },
        },
    );

    return <MenuItem onClick={() => forcePlaylistSync.mutate(isLikedSongsCollection)}>Force playlist sync</MenuItem>;
}

export default ForcePlaylistSyncMenuItem;
