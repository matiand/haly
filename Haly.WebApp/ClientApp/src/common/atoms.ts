import { atom } from "jotai";

import {
    AlbumBriefDto,
    AlbumTrackDto,
    ArtistBriefDto,
    PlaylistBriefDto,
    PrivateUserDto,
    TrackDto,
} from "../../generated/haly";
import { theme } from "./theme";

const sidebarWidthAtom = atom<number>(+localStorage.getItem("sidebarWidth")! || theme.sidebar.defaultWidth);
export const persistedSidebarWidthAtom = atom(
    (get) => get(sidebarWidthAtom),
    (_, set, newValue: number) => {
        set(sidebarWidthAtom, newValue);
        localStorage.setItem("sidebarWidth", newValue.toString());
    },
);
const withImprovedShuffleAtom = atom<boolean>(localStorage.getItem("withImprovedShuffle") === "true");
export const persistedWithImprovedShuffleAtom = atom(
    (get) => get(withImprovedShuffleAtom),
    (_, set, newValue: boolean) => {
        set(withImprovedShuffleAtom, newValue);
        localStorage.setItem("withImprovedShuffle", newValue.toString());
    },
);

export const cachedPlaylists = atom<PlaylistBriefDto[]>([]);
export const isPlaylistCachedAtom = (playlistId: string) =>
    atom((get) => get(cachedPlaylists).some((p) => p.id === playlistId));

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

export type PlaybackContext = {
    id: string;
    uri: string;
    name: string;
    type: "playlist" | "album" | "user" | "artist";
    isShuffled: boolean;
    repeatMode: "off" | "track" | "context";
};

export type PageContext = {
    id: string;
    title: string;
    type: PlaybackContext["type"];
    // Needed for accessing its dominant color
    imageUrl?: string | null;
};
export const pageContextAtom = atom<PageContext | null>(null);
export const pageContextIdAtom = atom((get) => get(pageContextAtom)?.id);
export const pageContextUriAtom = atom((get) => {
    // I'm using PageContext, because it's always available on relevant pages, unlike PlaybackContext.
    const pageContext = get(pageContextAtom);
    if (!pageContext) return "";

    const userId = get(userIdAtom);
    if (pageContext.type === "user") return `spotify:user:${userId}:collection`;

    return `spotify:${pageContext.type}:${pageContext.id}`;
});

export type StreamedTrack = {
    // They don't give us the actual id of streamed track.
    playbackId: string;
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
export const streamedTrackIdAtom = atom((get) => get(streamedTrackAtom)?.playbackId ?? "");
export const isPlaybackShuffledAtom = atom((get) => get(streamedTrackAtom)?.context?.isShuffled ?? false);
export const playbackRepeatModeAtom = atom((get) => get(streamedTrackAtom)?.context?.repeatMode ?? "off");
export const playbackContextIdAtom = atom((get) => get(streamedTrackAtom)?.context?.id);
export const playbackContextUriAtom = atom((get) => get(streamedTrackAtom)?.context?.uri);
export const playbackContextNameAtom = atom((get) => get(streamedTrackAtom)?.context?.name);

export const likedSongIdByPlaybackIdAtom = atom<Record<string, string | null>>({});

type SelectedTrack = {
    index: number;
    track: TrackDto | AlbumTrackDto;
};
export const selectedTracksAtom = atom<SelectedTrack[]>([]);
