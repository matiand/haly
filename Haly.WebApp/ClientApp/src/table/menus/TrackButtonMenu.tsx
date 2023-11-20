import { useAtomValue } from "jotai";

import { AlbumTrackDto, PlaylistTrackDto, TrackDto } from "../../../generated/haly";
import { selectedTracksAtom } from "../../common/atoms";
import ButtonMenu from "../../menus/ButtonMenu";
import useTableRowLikedState from "../useTableRowLikedState";
import TrackMenuItems from "./TrackMenuItems";

type TrackButtonMenuProps = {
    track: TrackDto | PlaylistTrackDto | AlbumTrackDto;
    collectionId?: string;
};

function TrackButtonMenu({ track }: TrackButtonMenuProps) {
    const selectedTracks = useAtomValue(selectedTracksAtom);
    const getLikedState = useTableRowLikedState();

    const tracks = selectedTracks.length > 1 ? selectedTracks.map((item) => item.track) : [track];
    const likedStates = tracks.map((t) => getLikedState(t.id, t.playbackId));

    return (
        <ButtonMenu label={`More options for track ${track.name}`}>
            <TrackMenuItems tracks={tracks} likedStates={likedStates} />
        </ButtonMenu>
    );
}

export default TrackButtonMenu;
