import { atom } from "jotai";

export const playlistIdsWithOldTracksAtom = atom<string[]>([]);
export const playlistHasOldTracksAtom = (playlistId: string) =>
    atom((get) => get(playlistIdsWithOldTracksAtom).includes(playlistId));
