export const GetMyPlaylistsQueryKey = ["me", "playlists"];
export const GetMyLikedSongsQueryKey = ["me", "tracks"];

export const GetQueueQueryKey = ["me", "player", "queue"];
export const GetRecentlyPlayedQueryKey = ["me", "player", "recently-played"];

export const IsCurrentUserFollowingAlbum = (albumId: string) => ["me", "following", "albums", "contains", { albumId }];
