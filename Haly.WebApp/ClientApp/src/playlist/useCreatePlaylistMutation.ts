import { useMutation } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { useCallback } from "react";

import { cachedPlaylistsAtom } from "../common/atoms/playlistAtoms";
import { userIdAtom } from "../common/atoms/userAtoms";
import halyClient from "../halyClient";

function useCreatePlaylistMutation(onSuccess?: () => void) {
    const userId = useAtomValue(userIdAtom);
    const playlists = useAtomValue(cachedPlaylistsAtom);

    const mutation = useMutation((name: string) => halyClient.me.createPlaylist({ name }), { onSuccess });
    const suggestedName = preparePlaylistName(playlists.filter((p) => p.ownerId === userId).length);

    return useCallback((name?: string) => mutation.mutateAsync(name ?? suggestedName), [mutation, suggestedName]);
}

function preparePlaylistName(playlistCount: number) {
    const paddedCount = String(playlistCount + 1).padStart(2, "0");

    return `My Playlist #${paddedCount}`;
}

export default useCreatePlaylistMutation;
