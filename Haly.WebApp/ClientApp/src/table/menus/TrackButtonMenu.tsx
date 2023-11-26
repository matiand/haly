import { useAtomValue } from "jotai";

import { AlbumTrackDto, PlaylistTrackDto, TrackDto } from "../../../generated/haly";
import { pageContextAtom } from "../../common/atoms/pageAtoms";
import { selectedTracksAtom } from "../../common/atoms/trackAtoms";
import ButtonMenu from "../../menus/ButtonMenu";
import useTableRowLikedState from "../useTableRowLikedState";
import TrackMenuItems from "./TrackMenuItems";

type TrackButtonMenuProps = {
    track: TrackDto | PlaylistTrackDto | AlbumTrackDto;
    collectionId?: string;
};

function TrackButtonMenu({ track }: TrackButtonMenuProps) {
    const selectedTracks = useAtomValue(selectedTracksAtom);
    const pageContext = useAtomValue(pageContextAtom);
    const getLikedState = useTableRowLikedState();

    const tracks = selectedTracks.length > 1 ? selectedTracks.map((item) => item.track) : [track];
    const likedStates = tracks.map((t) => getLikedState(t.id, t.playbackId));

    const playlistId = pageContext?.allow?.removeTrackFromPlaylist ? pageContext?.id : undefined;
    const disallowAddToQueue = pageContext == null;
    const disallowGoToArtist = pageContext?.type === "artist";

    return (
        <ButtonMenu size="small" label={`More options for track ${track.name}`}>
            <TrackMenuItems
                tracks={tracks}
                likedStates={likedStates}
                playlistId={playlistId}
                disallowAddToQueue={disallowAddToQueue}
                disallowGoToArtist={disallowGoToArtist}
            />
        </ButtonMenu>
    );
}

export default TrackButtonMenu;
