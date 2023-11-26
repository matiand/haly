import { atom } from "jotai";

import { AlbumTrackDto, PlaylistTrackDto, TrackDto } from "../../../generated/haly";

type SelectedTrack = {
    index: number;
    track: TrackDto | PlaylistTrackDto | AlbumTrackDto;
};

export const selectedTracksBaseAtom = atom<SelectedTrack[]>([]);

type SetterArg = SelectedTrack[] | ((arg: SelectedTrack[]) => SelectedTrack[]);
export const selectedTracksAtom = atom<SelectedTrack[], [SetterArg], void>(
    (get) => get(selectedTracksBaseAtom).sort((a, b) => a.index - b.index),
    (get, set, setterParam) => {
        // Allow to select only songs with ids.
        const selection = typeof setterParam === "function" ? setterParam(get(selectedTracksBaseAtom)) : setterParam;
        const onlySongsWithIds = selection.filter((item) => item.track.isSong && item.track.id);

        set(selectedTracksBaseAtom, onlySongsWithIds);
    },
);

export const likedSongIdByPlaybackIdAtom = atom<Record<string, string | null>>({});
export const isLikedSongsCollectionChangedAtom = atom(true);
