import { PlaylistSortOrder } from "../playlist/usePlaylistSortOrder";

export const GetMyPlaylistsQueryKey = ["me", "playlists"];
export const GetMyLikedSongsQueryKey = ["me", "tracks"];

export const GetQueueQueryKey = ["me", "player", "queue"];
export const GetRecentlyPlayedQueryKey = ["me", "player", "recently-played"];

export const IsCurrentUserFollowingAlbumQueryKey = (albumId: string) => [
    "me",
    "following",
    "albums",
    "contains",
    { albumId },
];

export const GetPlaylistQueryKey = (playlistId: string, sortOrder?: PlaylistSortOrder) =>
    sortOrder ? ["playlists", playlistId, { sortOrder }] : ["playlists", playlistId];
export const GetPlaylistTracksQueryKey = (playlistId: string, sortOrder: PlaylistSortOrder, searchTerm: string) => [
    "playlists",
    playlistId,
    "tracks",
    {
        sortOrder,
        searchTerm,
    },
];

export const GetArtistDiscographyQueryKey = (artistId: string) => ["artist", artistId, "discography"];

export const GetLatestNewReleasesJobQueryKey = ["jobs", "new-releases", "completed", "latest"];

export const GetMessageHubQueryKey = ["hub"];
