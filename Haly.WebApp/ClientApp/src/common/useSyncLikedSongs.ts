import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import { useEffect } from "react";

import halyClient from "../halyClient";
import { likedSongIdsAtom } from "./atoms";
import { GetMyLikedSongsQueryKey } from "./queryKeys";

function useSyncLikedSongs({ enabled }: { enabled: boolean }) {
    const setLikedTrackIds = useSetAtom(likedSongIdsAtom);
    const queryClient = useQueryClient();

    const syncLikedSongs = useMutation(() => halyClient.me.putLikedSongs(), {
        onSuccess: () => {
            queryClient.invalidateQueries(GetMyLikedSongsQueryKey);
        },
    });

    const likedSongsQuery = useQuery(GetMyLikedSongsQueryKey, () => halyClient.me.getLikedSongs(), {
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
            // Those ids cannot be null. You can't like a track without a spotifyId.
            const ids = likedSongsQuery.data.map((track) => track.spotifyId!);
            setLikedTrackIds(ids);
        }
    }, [likedSongsQuery.data, setLikedTrackIds]);
}

export default useSyncLikedSongs;
