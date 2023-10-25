import { MenuDivider } from "@szhsin/react-menu";
import { useAtomValue } from "jotai";

import { AlbumTrackDto, TrackDto } from "../../generated/haly";
import { selectedTracksAtom, TrackDisallowedActions, trackDisallowedActionsAtom } from "../common/atoms";
import AddToQueueMenuItem from "../contextmenu/AddToQueueMenuItem";
import FollowMenuItem from "../contextmenu/FollowMenuItem";

function TableRowContextMenu() {
    const selectedTracks = useAtomValue(selectedTracksAtom);
    const disallowedActions = useAtomValue(trackDisallowedActionsAtom);

    const tracks = selectedTracks.map((t) => t.track);

    return <Items tracks={tracks} disallowedActions={disallowedActions} />;
}

type MoreOptionsTableRowProps = {
    track: TrackDto | AlbumTrackDto;
};

function MoreOptionsTableRow({ track }: MoreOptionsTableRowProps) {
    const disallowedActions = useAtomValue(trackDisallowedActionsAtom);

    return <Items tracks={[track]} disallowedActions={disallowedActions} />;
}

type ItemsProps = {
    tracks: (TrackDto | AlbumTrackDto)[];
    disallowedActions: TrackDisallowedActions | null;
};

function Items({ tracks, disallowedActions }: ItemsProps) {
    if (tracks.length === 0) return null;

    // disallows:
    //      remove from this playlist
    //      go to album
    //      go to artist
    //      add to queue
    if (tracks.length === 1)
        return (
            <>
                <FollowMenuItem />
                {disallowedActions?.queueAdd ? null : <AddToQueueMenuItem />}
                <MenuDivider />

                {/*<AddToPlaylistMenuItem />*/}

                <MenuDivider />
                {/*<ShareMenuSection type="album" id={album.id} name={album.name} path={`/album/${album.id}`} />*/}
            </>
        );

    return <></>;
}

export default TableRowContextMenu;
