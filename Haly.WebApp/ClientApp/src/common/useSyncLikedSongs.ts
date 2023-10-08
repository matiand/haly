import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import { useEffect } from "react";

import halyClient from "../halyClient";
import { likedSongIdByPlaybackIdAtom } from "./atoms";
import { GetMyLikedSongsQueryKey } from "./queryKeys";

function useSyncLikedSongs({ enabled }: { enabled: boolean }) {
    const setLikedSongIdByPlaybackId = useSetAtom(likedSongIdByPlaybackIdAtom);
    const queryClient = useQueryClient();

    const syncLikedSongs = useMutation(() => halyClient.me.putMyLikedSongs(), {
        onSuccess: () => {
            queryClient.invalidateQueries(GetMyLikedSongsQueryKey);
        },
    });

    const likedSongsQuery = useQuery(GetMyLikedSongsQueryKey, () => halyClient.me.getMyLikedSongs(), {
        refetchOnWindowFocus: false,
        enabled,
    });

    useEffect(() => {
        if (enabled && syncLikedSongs.isIdle) {
            syncLikedSongs.mutate();
        }
    }, [enabled, syncLikedSongs]);

    useEffect(() => {
        if (likedSongsQuery.data) {
            const data = likedSongsQuery.data.likedSongIdByPlaybackId;
            setLikedSongIdByPlaybackId(data);
        }
    }, [likedSongsQuery.data, setLikedSongIdByPlaybackId]);
}

export default useSyncLikedSongs;
