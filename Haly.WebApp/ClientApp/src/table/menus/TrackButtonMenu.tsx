import { useAtomValue } from "jotai";

import { AlbumTrackDto, PlaylistTrackDto, TrackDto } from "../../../generated/haly";
import { pageContextAtom } from "../../common/atoms/pageAtoms";
import ButtonMenu from "../../menus/ButtonMenu";
import useTableRowLikedState from "../useTableRowLikedState";
import TrackMenuItems from "./TrackMenuItems";

type TrackButtonMenuProps = {
    track: TrackDto | PlaylistTrackDto | AlbumTrackDto;
    collectionId?: string;
};

function TrackButtonMenu({ track }: TrackButtonMenuProps) {
    const pageContext = useAtomValue(pageContextAtom);
    const getLikedState = useTableRowLikedState();

    const isEditable = pageContext?.type === "playlist" && pageContext.isEditable;
    const disallowAddToQueue = pageContext == null;
    const disallowGoToArtist = pageContext?.type === "artist";

    return (
        <ButtonMenu size="small" label={`More options for track ${track.name}`}>
            <TrackMenuItems
                tracks={[track]}
                likedStates={[getLikedState(track.id, track.playbackId)]}
                playlistIdForRemovals={isEditable ? pageContext.data.id : undefined}
                disallowAddToQueue={disallowAddToQueue}
                disallowGoToArtist={disallowGoToArtist}
            />
        </ButtonMenu>
    );
}

export default TrackButtonMenu;
