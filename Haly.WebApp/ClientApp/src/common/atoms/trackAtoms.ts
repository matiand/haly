import { atom } from "jotai";

import { AlbumTrackDto, PlaylistTrackDto, TrackDto } from "../../../generated/haly";

type SelectedTrack = {
    index: number;
    track: TrackDto | PlaylistTrackDto | AlbumTrackDto;
};

export const selectedTracksAtom = atom<SelectedTrack[]>([]);

export const likedSongIdByPlaybackIdAtom = atom<Record<string, string | null>>({});
