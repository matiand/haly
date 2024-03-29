import { atom } from "jotai";

import { PlaylistBriefDto } from "../../../generated/haly";

export const cachedPlaylistsAtom = atom<PlaylistBriefDto[]>([]);
export const isPlaylistCachedAtom = (playlistId: string) =>
    atom((get) => get(cachedPlaylistsAtom).some((p) => p.id === playlistId));

export const playlistSearchTermAtom = atom<string>("");
export const playlistSliceDurationAtom = atom<string | null>(null);
export const playlistSliceSongsTotalAtom = atom<number | null>(null);

export const playlistIdsWithOldTracksAtom = atom<string[]>([]);
