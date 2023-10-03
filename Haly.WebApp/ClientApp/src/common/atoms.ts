import { atom } from "jotai";

import { AlbumBriefDto, ArtistBriefDto, PrivateUserDto } from "../../generated/haly";
import { theme } from "./theme";

const sidebarWidthAtom = atom<number>(+localStorage.getItem("sidebarWidth")! || theme.sidebar.defaultWidth);
export const persistedSidebarWidthAtom = atom(
    (get) => get(sidebarWidthAtom),
    (_, set, newValue: number) => {
        set(sidebarWidthAtom, newValue);
        localStorage.setItem("sidebarWidth", newValue.toString());
    },
);

export const cachedPlaylistIdsAtom = atom<string[] | null>(null);
export const isPlaylistCachedAtom = (playlistId: string) =>
    atom((get) => get(cachedPlaylistIdsAtom)?.includes(playlistId) ?? false);

export const dominantColorsAtom = atom<Record<string, string | undefined>>({
    "": theme.colors.dominantDefault,
});

export const playlistIdsWithOldTracksAtom = atom<string[]>([]);

export const pageHeaderVisibilityAtom = atom<number>(1);

export const userAtom = atom<PrivateUserDto | null>(null);
export const userIdAtom = atom<string>((get) => get(userAtom)?.id ?? "");
export const userCanStreamTracksAtom = atom<boolean>((get) => get(userAtom)?.canStreamTracks ?? false);

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
    id: string;
    name: string;
    type: "playlist" | "album" | "user" | "artist";
    isShuffled: boolean;
    repeatMode: "off" | "track" | "context";
};

export type StreamedTrack = {
    id: string;
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

export const playerSdkAtom = atom<Spotify.Player | null>(null);

export const streamedTrackAtom = atom<StreamedTrack | null>(null);
export const isTrackPausedAtom = atom((get) => get(streamedTrackAtom)?.isPaused ?? false);
export const streamedTrackIdAtom = atom((get) => get(streamedTrackAtom)?.id ?? "");
export const isPlaybackShuffledAtom = atom((get) => get(streamedTrackAtom)?.context?.isShuffled ?? false);
export const playbackRepeatModeAtom = atom((get) => get(streamedTrackAtom)?.context?.repeatMode ?? "off");
export const playbackContextIdAtom = atom((get) => get(streamedTrackAtom)?.context?.id);
export const playbackContextNameAtom = atom((get) => get(streamedTrackAtom)?.context?.name);

export const likedSongIdsAtom = atom<string[]>([]);

export const selectedTrackIndicesAtom = atom<number[]>([]);
