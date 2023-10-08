import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSetAtom } from "jotai";

import halyClient from "../halyClient";
import { likedSongIdByPlaybackIdAtom } from "./atoms";
import { GetMyPlaylistsQueryKey } from "./queryKeys";

export type FollowMutationParams =
    | {
          // If the track is not followed, we use track id for collections and playbackId for
          // streamed tracks (that's the only id they have).
          // For followed ones, we use the id that was used for follow.
          likedId: string;
          playbackId: string;
          type: "track";
      }
    | {
          id: string;
          type: "playlist";
      };

function useFollowMutations() {
    const queryClient = useQueryClient();
    const setLikedSongIdByPlaybackId = useSetAtom(likedSongIdByPlaybackIdAtom);

    const follow = useMutation<FollowMutationParams, unknown, FollowMutationParams>(
        (params) =>
            params.type === "playlist"
                ? halyClient.following.followPlaylist({ id: params.id }).then(() => params)
                : halyClient.following.followTracks({ ids: params.likedId }).then(() => params),
        {
            onSuccess: (params) => {
                if (params.type === "playlist") {
                    queryClient.invalidateQueries(GetMyPlaylistsQueryKey);
                } else {
                    setLikedSongIdByPlaybackId((prev) => ({
                        ...prev,
                        [params.playbackId]: params.likedId,
                    }));
                    // todo: use webapi to add to LikesOf* playlist
                }
            },
        },
    );

    const unfollow = useMutation<FollowMutationParams, unknown, FollowMutationParams>(
        (params) =>
            params.type === "playlist"
                ? halyClient.following.unfollowPlaylist({ id: params.id }).then(() => params)
                : halyClient.following.unfollowTracks({ ids: params.likedId }).then(() => params),
        {
            onSuccess: (params) => {
                if (params.type === "playlist") {
                    queryClient.invalidateQueries(GetMyPlaylistsQueryKey);
                } else {
                    setLikedSongIdByPlaybackId((prev) => ({
                        ...prev,
                        [params.playbackId]: null,
                    }));
                    // todo: use webapi to remove from LikesOf* playlist
                }
            },
        },
    );

    return {
        follow,
        unfollow,
    };
}

export default useFollowMutations;
