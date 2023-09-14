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
    collectionId: string;
    name: string;
    type: "playlist" | "album" | "user";
    isShuffled: boolean;
    repeatMode: "off" | "track" | "context";
};

export type StreamedTrack = {
    spotifyId: string;
    name: string;
    durationInMs: number;
    positionInMs: number;
    isPaused: boolean;

    /* Last state update in milliseconds. */
    updatedAt: number;

    context?: PlaybackContext;

    album: AlbumBriefDto;
    artists: ArtistBriefDto[];
};

export const streamedTrackAtom = atom<StreamedTrack | null>(null);
export const streamedTrackIdAtom = atom((get) => get(streamedTrackAtom)?.spotifyId);
export const streamedPlaylistTrackIdAtom = atom((get) => {
    const ctx = get(streamedTrackAtom)?.context;
    return ctx?.type === "playlist" ? get(streamedTrackAtom)?.spotifyId : null;
});
export const streamedAlbumTrackIdAtom = atom((get) => {
    const ctx = get(streamedTrackAtom)?.context;
    return ctx?.type === "album" ? get(streamedTrackAtom)?.spotifyId : null;
});
export const streamedPlaylistIdAtom = atom((get) => {
    const ctx = get(streamedTrackAtom)?.context;
    return ctx?.type === "playlist" ? ctx.collectionId : null;
});
export const isPlaybackShuffledAtom = atom((get) => get(streamedTrackAtom)?.context?.isShuffled ?? false);
export const playbackRepeatModeAtom = atom((get) => get(streamedTrackAtom)?.context?.repeatMode ?? "off");
export const playbackContextNameAtom = atom((get) => get(streamedTrackAtom)?.context?.name);
