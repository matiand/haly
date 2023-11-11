import { useMutation } from "@tanstack/react-query";
import { useAtomValue } from "jotai";

import { cachedPlaylists, userIdAtom } from "../common/atoms";
import halyClient from "../halyClient";

function useCreatePlaylistMutation(onSuccess?: () => void) {
    const userId = useAtomValue(userIdAtom);
    const playlists = useAtomValue(cachedPlaylists);

    const newPlaylistName = preparePlaylistName(playlists.filter((p) => p.ownerId === userId).length);

    return useMutation(
        ["users", userId, "playlist", { newPlaylistName }],
        () =>
            halyClient.users.createPlaylist({
                userId,
                name: newPlaylistName,
            }),
        { onSuccess },
    );
}

function preparePlaylistName(playlistCount: number) {
    const paddedCount = String(playlistCount + 1).padStart(2, "0");

    return `My Playlist #${paddedCount}`;
}

export default useCreatePlaylistMutation;
