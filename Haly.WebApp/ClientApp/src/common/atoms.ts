import { atom } from "jotai";

import { PrivateUserDto } from "../../generated/haly";

export const cachedPlaylistIdsAtom = atom<string[] | null>(null);
export const isPlaylistCachedAtom = (playlistId: string) =>
    atom((get) => get(cachedPlaylistIdsAtom)?.includes(playlistId) ?? false);

export const dominantColorsAtom = atom<Record<string, string | undefined>>({});

export const playlistIdsWithOldTracksAtom = atom<string[]>([]);

export const pageHeaderVisibilityAtom = atom<number>(1);

export const userAtom = atom<PrivateUserDto | null>(null);

export const artistNameAtom = atom<string | null>(null);

export const playlistSearchTermAtom = atom<string>("");
export const playlistDurationAtom = atom<string>("");
export const playlistSongsTotalAtom = atom<number>(0);

export type PageContext = {
    title: string;
    imageUrl?: string | null;
    onPlayback?: () => void;
};
export const pageContextAtom = atom<PageContext | null>(null);

export type PlaylistSortOrder =
    | "none"
    | "title"
    | "title_desc"
    | "artist"
    | "artist_desc"
    | "album"
    | "album_desc"
    | "added_at"
    | "added_at_desc"
    | "duration"
    | "duration_desc";
export const playlistSortOrderAtom = atom<PlaylistSortOrder>("none");
