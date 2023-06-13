import { atom } from "jotai";

export const cachedPlaylistIdsAtom = atom<string[] | null>(null);
export const isPlaylistCachePopulatedAtom = atom((get) => Array.isArray(get(cachedPlaylistIdsAtom)));
export const isPlaylistCachedAtom = (playlistId: string) =>
    atom((get) => get(cachedPlaylistIdsAtom)?.includes(playlistId) ?? false);

export const dominantColorsAtom = atom<Record<string, string | undefined>>({});

export const playlistIdsWithOldTracksAtom = atom<string[]>([]);
export const playlistHasOldTracksAtom = (playlistId: string) =>
    atom((get) => get(playlistIdsWithOldTracksAtom).includes(playlistId));
