import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import toast from "react-hot-toast";

import halyClient from "../halyClient";
import { likedSongIdByPlaybackIdAtom } from "./atoms";
import { GetMyPlaylistsQueryKey, IsCurrentUserFollowingAlbum } from "./queryKeys";

export type HeartMutationParams =
    | {
          type: "track";
          ids: {
              // 'likedId' is the id used for following/unfollowing.
              // If the track is not followed, we use its 'id' in collections and 'playbackId' for
              // streamed tracks (that's the only id they have).
              likedId: string;
              playbackId: string;
          }[];
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
                await halyClient.meFollowing.followPlaylist({ id: params.id });
                return params;
            } else if (params.type === "album") {
                await halyClient.meFollowing.followAlbum({ id: params.id });
                return params;
            } else {
                await halyClient.meFollowing.followTracks({ requestBody: params.ids.map((item) => item.likedId) });
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
                    const next = params.ids.reduce(
                        (acc, item) => ({
                            ...acc,
                            [item.playbackId]: item.likedId,
                        }),
                        {},
                    );
                    setLikedSongIdByPlaybackId((prev) => ({ ...prev, ...next }));

                    halyClient.me.putMyLikedSongs();
                    toast("Added to Liked Songs.");
                }
            },
        },
    );

    const unfollow = useMutation<HeartMutationParams, unknown, HeartMutationParams>(
        async function (params) {
            if (params.type === "playlist") {
                await halyClient.meFollowing.unfollowPlaylist({ id: params.id });
                return params;
            } else if (params.type === "album") {
                await halyClient.meFollowing.unfollowAlbum({ id: params.id });
                return params;
            } else {
                await halyClient.meFollowing.unfollowTracks({ requestBody: params.ids.map((item) => item.likedId) });
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
                    const next = params.ids.reduce(
                        (acc, item) => ({
                            ...acc,
                            [item.playbackId]: null,
                        }),
                        {},
                    );
                    setLikedSongIdByPlaybackId((prev) => ({ ...prev, ...next }));

                    halyClient.me.putMyLikedSongs();
                    toast("Removed from Liked Songs.");
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
