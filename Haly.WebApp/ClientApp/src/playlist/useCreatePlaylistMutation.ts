import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import toast from "react-hot-toast";

import { cachedPlaylists, userIdAtom } from "../common/atoms";
import { GetMyPlaylistsQueryKey } from "../common/queryKeys";
import halyClient from "../halyClient";

function useCreatePlaylistMutation() {
    const userId = useAtomValue(userIdAtom);
    const playlists = useAtomValue(cachedPlaylists);
    const queryClient = useQueryClient();

    const newPlaylistName = preparePlaylistName(playlists.filter((p) => p.ownerId === userId).length);

    return useMutation(
        ["users", userId, "playlist", { newPlaylistName }],
        () =>
            halyClient.users.createPlaylist({
                userId,
                name: newPlaylistName,
            }),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(GetMyPlaylistsQueryKey);
                // We show a toast instead of navigating to it.
                toast("Created new playlist");
            },
        },
    );
}

function preparePlaylistName(playlistCount: number) {
    const paddedCount = String(playlistCount + 1).padStart(2, "0");

    return `My Playlist #${paddedCount}`;
}

export default useCreatePlaylistMutation;
