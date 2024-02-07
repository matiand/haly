import { useAtomValue } from "jotai";

import { AlbumTrackDto, PlaylistTrackDto, TrackDto } from "../../../generated/haly";
import { pageContextAtom } from "../../common/atoms/pageAtoms";
import { StreamedTrackDto } from "../../common/atoms/playbackAtoms";
import { selectedTracksAtom } from "../../common/atoms/trackAtoms";
import ContextMenu from "../../menus/ContextMenu";
import { AnchorPointMenuProps } from "../../menus/useContextMenu";
import useTableRowLikedState from "../useTableRowLikedState";
import TrackMenuItems from "./TrackMenuItems";

type TrackContextMenuProps = {
    track: TrackDto | PlaylistTrackDto | AlbumTrackDto | StreamedTrackDto;
    menuProps: AnchorPointMenuProps;
};

function TrackContextMenu({ track, menuProps }: TrackContextMenuProps) {
    const selectedTracks = useAtomValue(selectedTracksAtom);
    const pageContext = useAtomValue(pageContextAtom);
    const getLikedState = useTableRowLikedState();

    const tracks = selectedTracks.length > 1 ? selectedTracks.map((item) => item.track) : [track];
    const likedStates = tracks.map((t) => getLikedState(t.id, t.playbackId));

    const isEditable = pageContext?.type === "playlist" && pageContext.isEditable;
    const disallowAddToQueue = pageContext == null;
    const disallowGoToArtist = pageContext?.type === "artist";

    return (
        <ContextMenu menuProps={menuProps}>
            <TrackMenuItems
                tracks={tracks}
                likedStates={likedStates}
                playlistIdForRemovals={isEditable ? pageContext.data.id : undefined}
                disallowAddToQueue={disallowAddToQueue}
                disallowGoToArtist={disallowGoToArtist}
            />
        </ContextMenu>
    );
}

export default TrackContextMenu;
