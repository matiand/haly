import { useAtomValue } from "jotai";

import { AlbumTrackDto, PlaylistTrackDto, TrackDto } from "../../../generated/haly";
import { selectedTracksAtom } from "../../common/atoms/trackAtoms";
import ContextMenu from "../../menus/ContextMenu";
import { AnchorPointMenuProps } from "../../menus/useContextMenu";
import useTableRowLikedState from "../useTableRowLikedState";
import TrackMenuItems from "./TrackMenuItems";

type TrackContextMenuProps = {
    track: TrackDto | PlaylistTrackDto | AlbumTrackDto;
    menuProps: AnchorPointMenuProps;
};

function TrackContextMenu({ track, menuProps }: TrackContextMenuProps) {
    const selectedTracks = useAtomValue(selectedTracksAtom);
    const getLikedState = useTableRowLikedState();

    const tracks = selectedTracks.length > 1 ? selectedTracks.map((item) => item.track) : [track];
    const likedStates = tracks.map((t) => getLikedState(t.id, t.playbackId));

    return (
        <ContextMenu menuProps={menuProps}>
            <TrackMenuItems tracks={tracks} likedStates={likedStates} />
        </ContextMenu>
    );
}

export default TrackContextMenu;
