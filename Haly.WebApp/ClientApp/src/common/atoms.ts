import { atom } from "jotai";

import { PlaylistWithTracksDto } from "../../generated/haly";

export const cachedPlaylistIdsAtom = atom<string[] | null>(null);
export const isPlaylistCachedAtom = (playlistId: string) =>
    atom((get) => get(cachedPlaylistIdsAtom)?.includes(playlistId) ?? false);

export const dominantColorsAtom = atom<Record<string, string | undefined>>({});

export const playlistIdsWithOldTracksAtom = atom<string[]>([]);

export const pageContextAtom = atom<PlaylistWithTracksDto | null>(null);
