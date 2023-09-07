import { atom } from "jotai";

import { AlbumBriefDto, ArtistBriefDto, PrivateUserDto } from "../../generated/haly";
import { theme } from "./theme";

export const cachedPlaylistIdsAtom = atom<string[] | null>(null);
export const isPlaylistCachedAtom = (playlistId: string) =>
    atom((get) => get(cachedPlaylistIdsAtom)?.includes(playlistId) ?? false);

export const dominantColorsAtom = atom<Record<string, string | undefined>>({
    "": theme.colors.dominantDefault,
});

export const playlistIdsWithOldTracksAtom = atom<string[]>([]);

export const pageHeaderVisibilityAtom = atom<number>(1);

export const userAtom = atom<PrivateUserDto | null>(null);

export const artistNameAtom = atom<string | null>(null);

export const playlistSearchTermAtom = atom<string>("");
export const playlistSliceDurationAtom = atom<string | null>(null);
export const playlistSliceSongsTotalAtom = atom<number | null>(null);

export type PageContext = {
    title: string;
    // Needed for accessing its dominant color
    imageUrl?: string | null;
    onPlayback?: () => void;
};
export const pageContextAtom = atom<PageContext | null>(null);

export type PlaybackContext = {
    entityId: string;
    type: "playlist" | "album";
};

export type StreamedTrack = {
    spotifyId: string;
    name: string;
    album: AlbumBriefDto;
    artists: ArtistBriefDto[];
};

export const playbackContextAtom = atom<PlaybackContext | null>(null);
