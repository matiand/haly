import { atom } from "jotai";

export const collectionDominantColorAtom = atom<string | null>(null);

export const playlistIdsWithOldTracksAtom = atom<string[]>([]);
export const playlistHasOldTracksAtom = (playlistId: string) =>
    atom((get) => get(playlistIdsWithOldTracksAtom).includes(playlistId));
