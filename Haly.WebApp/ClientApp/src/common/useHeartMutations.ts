import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import toast from "react-hot-toast";

import halyClient from "../halyClient";
import { likedSongIdByPlaybackIdAtom } from "./atoms";
import { GetMyPlaylistsQueryKey, IsCurrentUserFollowingAlbum } from "./queryKeys";

export type HeartMutationParams =
    | {
          // 'likedId' is the id used for following/unfollowing.
          // If the track is not followed, we use its 'id' in collections and 'playbackId' for
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

// Mutations for following/unfollowing stuff from your library.
function useHeartMutations() {
    const queryClient = useQueryClient();
    const setLikedSongIdByPlaybackId = useSetAtom(likedSongIdByPlaybackIdAtom);

    const follow = useMutation<HeartMutationParams, unknown, HeartMutationParams>(
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
                    toast("Added to Your Library.");
                } else if (params.type === "album") {
                    queryClient.invalidateQueries(IsCurrentUserFollowingAlbum(params.id));
                    toast("Added to Your Library.");
                } else {
                    setLikedSongIdByPlaybackId((prev) => ({
                        ...prev,
                        [params.playbackId]: params.likedId,
                    }));
                    toast("Added to Liked Songs.");
                    // todo: use webapi to add to LikesOf* playlist
                }
            },
        },
    );

    const unfollow = useMutation<HeartMutationParams, unknown, HeartMutationParams>(
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
                    toast("Removed from Your Library.");
                } else if (params.type === "album") {
                    queryClient.invalidateQueries(IsCurrentUserFollowingAlbum(params.id));
                    toast("Removed from Your Library.");
                } else {
                    setLikedSongIdByPlaybackId((prev) => ({
                        ...prev,
                        [params.playbackId]: null,
                    }));
                    toast("Removed from Liked Songs.");
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

export default useHeartMutations;
