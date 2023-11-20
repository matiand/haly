import { MenuDivider } from "@szhsin/react-menu";

import { AlbumTrackDto, PlaylistTrackDto, TrackDto } from "../../../generated/haly";
import { TrackDisallowedActions } from "../../common/atoms";
import AddToPlaylistMenuItem from "../../menus/items/AddToPlaylistMenuItem";
import AddToQueueMenuItem from "../../menus/items/AddToQueueMenuItem";
import GoToMenuItem from "../../menus/items/GoToMenuItem";
import HeartMenuItem from "../../menus/items/HeartMenuItem";
import ShareMenuItems from "../../menus/items/ShareMenuItems";
import { TrackLikedState } from "../useTableRowLikedState";

type TrackMenuItemsProps = {
    tracks: (TrackDto | PlaylistTrackDto | AlbumTrackDto)[];
    likedStates: TrackLikedState[];
    disallowedActions: TrackDisallowedActions;
    collectionId?: string;
};

function TrackMenuItems({ tracks, likedStates, disallowedActions, collectionId }: TrackMenuItemsProps) {
    const trackUris = tracks.map((t) => t.uri!);

    if (tracks.length === 1) {
        const track = tracks[0];

        return (
            <>
                <AddToQueueMenuItem trackUris={trackUris} />
                <HeartMenuItem params={} isInLibrary={} />
                <AddToPlaylistMenuItem trackUris={trackUris} />
                <MenuDivider />
                <GoToMenuItem artistId={track.artists[0].id} />
                {"album" in track && <GoToMenuItem albumId={track.album.id} />}
                <MenuDivider />
                <ShareMenuItems type="song" id={track.id!} name={track.name} path={`/track/${track.id}`} />
            </>
        );
    }

    const uris = tracks.map((t) => t.uri).filter((uri): uri is string => Boolean(uri));

    return (
        <>
            <AddToQueueMenuItem trackUris={uris} />
            {/*<HeartMenuItem params={} isInLibrary={}/>*/}
            <AddToPlaylistMenuItem trackUris={uris} />
        </>
    );
}

export default TrackMenuItems;
