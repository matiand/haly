import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAtom, useSetAtom } from "jotai";
import { useEffect } from "react";

import halyClient from "../halyClient";
import { isLikedSongsCollectionChangedAtom, likedSongIdByPlaybackIdAtom } from "./atoms/trackAtoms";
import { GetPlaylistQueryKey } from "./queryKeys";

const fifteenMinutes = 15 * 60 * 1000;

function useLikedSongsManagement({ enabled }: { enabled: boolean }) {
    const [isLikedSongsCollectionChanged, setIsLikedSongsCollectionChanged] = useAtom(
        isLikedSongsCollectionChangedAtom,
    );
    const setLikedSongIdByPlaybackId = useSetAtom(likedSongIdByPlaybackIdAtom);
    const queryClient = useQueryClient();

    const syncLikedSongs = useMutation({
        mutationFn: async () => {
            await halyClient.me.putMyLikedSongs();
            return halyClient.me.getMyLikedSongs();
        },
        onSuccess: (response) => {
            const data = response.likedSongIdByPlaybackId;
            setLikedSongIdByPlaybackId(data);

            queryClient.invalidateQueries({ queryKey: GetPlaylistQueryKey(response.collectionId) });
        },
    });

    useEffect(() => {
        if (enabled && isLikedSongsCollectionChanged && !syncLikedSongs.isPending) {
            setIsLikedSongsCollectionChanged(false);
            syncLikedSongs.mutate();
        }
    }, [enabled, isLikedSongsCollectionChanged, setIsLikedSongsCollectionChanged, syncLikedSongs]);

    useEffect(() => {
        const interval = setInterval(() => {
            syncLikedSongs.mutate();
        }, fifteenMinutes);

        return () => clearInterval(interval);
    }, [syncLikedSongs]);
}

export default useLikedSongsManagement;
