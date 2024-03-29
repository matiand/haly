import { atom } from "jotai";

import { AlbumBriefDto, ArtistBriefDto } from "../../../generated/haly";
import { PageContext } from "./pageAtoms";

export type PlaybackContext = {
    id: string;
    uri: string;
    name: string;
    type: PageContext["type"];
    isShuffled: boolean;
    repeatMode: "off" | "track" | "context";
};

export type StreamedTrackDto = {
    // The player sdk only returns the playback id of a streamed track. To avoid any confusion, we
    // don't assign the id key.
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

export type StreamedTrackWithIdDto = StreamedTrackDto & {
    id: string;
    uri: string;
};

export const playerSdkAtom = atom<Spotify.Player | null>(null);

export const streamedTrackAtom = atom<StreamedTrackDto | null>(null);
export const isTrackPausedAtom = atom((get) => get(streamedTrackAtom)?.isPaused ?? false);
export const streamedPlaybackIdAtom = atom((get) => get(streamedTrackAtom)?.playbackId ?? "");
export const isPlaybackShuffledAtom = atom((get) => get(streamedTrackAtom)?.context?.isShuffled ?? false);
export const playbackRepeatModeAtom = atom((get) => get(streamedTrackAtom)?.context?.repeatMode ?? "off");
export const playbackUriAtom = atom((get) => get(streamedTrackAtom)?.context?.uri);
export const playbackNameAtom = atom((get) => get(streamedTrackAtom)?.context?.name);

const withImprovedShuffleAtom = atom<boolean>(localStorage.getItem("withImprovedShuffle") === "true");
export const persistedWithImprovedShuffleAtom = atom(
    (get) => get(withImprovedShuffleAtom),
    (_, set, newValue: boolean) => {
        set(withImprovedShuffleAtom, newValue);
        localStorage.setItem("withImprovedShuffle", newValue.toString());
    },
);

const withGeniusIntegrationAtom = atom<boolean>(localStorage.getItem("withGeniusIntegration") === "true");
export const persistedWithGeniusIntegrationAtom = atom(
    (get) => get(withGeniusIntegrationAtom),
    (_, set, newValue: boolean) => {
        set(withGeniusIntegrationAtom, newValue);
        localStorage.setItem("withGeniusIntegration", newValue.toString());
    },
);

const geniusTokenAtom = atom<string>(localStorage.getItem("geniusToken") ?? "");
export const persistedGeniusTokenAtom = atom(
    (get) => get(geniusTokenAtom),
    (_, set, newValue: string) => {
        set(geniusTokenAtom, newValue);
        localStorage.setItem("geniusToken", newValue);
    },
);
