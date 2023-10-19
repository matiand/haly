import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSetAtom } from "jotai";

import halyClient from "../halyClient";
import { likedSongIdByPlaybackIdAtom } from "./atoms";
import { GetMyPlaylistsQueryKey, IsCurrentUserFollowingAlbum } from "./queryKeys";

export type FollowMutationParams =
    | {
          // todo: this comment is wrong
          // If the track is not followed, we use 'likedId' for collections and 'playbackId' for
          // streamed tracks (that's the only id they have).
          // For followed ones, we use 'likedId'.
          likedId: string;
          playbackId: string;
          type: "track";
      }
    | {
          id: string;
          type: "playlist";
      }
    | {
          id: string;
          type: "album";
      };

function useFollowMutations() {
    const queryClient = useQueryClient();
    const setLikedSongIdByPlaybackId = useSetAtom(likedSongIdByPlaybackIdAtom);

    const follow = useMutation<FollowMutationParams, unknown, FollowMutationParams>(
        async (params) => {
            if (params.type === "playlist") {
                await halyClient.following.followPlaylist({ id: params.id });
                return params;
            } else if (params.type === "album") {
                await halyClient.following.followAlbum({ id: params.id });
                return params;
            } else {
                await halyClient.following.followTracks({ ids: params.likedId });
                return params;
            }
        },
        {
            onSuccess: (params) => {
                if (params.type === "playlist") {
                    queryClient.invalidateQueries(GetMyPlaylistsQueryKey);
                } else if (params.type === "album") {
                    queryClient.invalidateQueries(IsCurrentUserFollowingAlbum(params.id));
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
        async function (params) {
            if (params.type === "playlist") {
                await halyClient.following.unfollowPlaylist({ id: params.id });
                return params;
            } else if (params.type === "album") {
                await halyClient.following.unfollowAlbum({ id: params.id });
                return params;
            } else {
                await halyClient.following.unfollowTracks({ ids: params.likedId });
                return params;
            }
        },
        {
            onSuccess: (params) => {
                if (params.type === "playlist") {
                    queryClient.invalidateQueries(GetMyPlaylistsQueryKey);
                } else if (params.type === "album") {
                    queryClient.invalidateQueries(IsCurrentUserFollowingAlbum(params.id));
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
