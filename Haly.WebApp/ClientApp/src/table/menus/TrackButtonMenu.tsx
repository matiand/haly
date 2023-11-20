import { useAtomValue } from "jotai";

import { AlbumTrackDto, PlaylistTrackDto, TrackDto } from "../../../generated/haly";
import { selectedTracksAtom, trackDisallowedActionsAtom } from "../../common/atoms";
import ButtonMenu from "../../menus/ButtonMenu";
import useTableRowLikedState from "../useTableRowLikedState";
import TrackMenuItems from "./TrackMenuItems";

type TrackButtonMenuProps = {
    track: TrackDto | PlaylistTrackDto | AlbumTrackDto;
    collectionId?: string;
};

function TrackButtonMenu({ track, collectionId }: TrackButtonMenuProps) {
    const disallowedActions = useAtomValue(trackDisallowedActionsAtom);
    const selectedTracks = useAtomValue(selectedTracksAtom);
    const getLikedState = useTableRowLikedState();

    const tracks = selectedTracks.length > 1 ? selectedTracks.map((item) => item.track) : [track];
    const likedStates = tracks.map((t) => getLikedState(t.id, t.playbackId));

    return (
        <ButtonMenu label={`More options for track ${track.name}`}>
            <TrackMenuItems
                tracks={tracks}
                likedStates={likedStates}
                disallowedActions={disallowedActions as object}
                collectionId={collectionId}
            />
        </ButtonMenu>
    );
}

export default TrackButtonMenu;
