import { atom } from "jotai";

import { AlbumTrackDto, PlaylistTrackDto, TrackDto } from "../../../generated/haly";

type SelectedTrack = {
    index: number;
    track: TrackDto | PlaylistTrackDto | AlbumTrackDto;
};

const emptySelection: SelectedTrack[] = [];
export const selectedTracksBaseAtom = atom(emptySelection);

type SetterArg = SelectedTrack[] | ((arg: SelectedTrack[]) => SelectedTrack[]);
export const selectedTracksAtom = atom<SelectedTrack[], [SetterArg], void>(
    (get) => {
        const currSelection = get(selectedTracksBaseAtom);

        // Use a stable reference to avoid unnecessary rerenders when setAtom was used to clear the selection.
        return currSelection.length === 0 ? emptySelection : currSelection.sort((a, b) => a.index - b.index);
    },
    (get, set, setterParam) => {
        // Allow to select only songs with ids.
        const selection = typeof setterParam === "function" ? setterParam(get(selectedTracksBaseAtom)) : setterParam;
        const onlySongsWithIds = selection.filter((item) => item.track.isSong && item.track.id);

        set(selectedTracksBaseAtom, onlySongsWithIds);
    },
);

export const likedSongIdByPlaybackIdAtom = atom<Record<string, string | null>>({});
export const isLikedSongsCollectionChangedAtom = atom(true);
