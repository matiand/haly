import { useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";

import { StreamedTrackDto } from "../common/atoms/playbackAtoms";
import { cachedPlaylistsAtom } from "../common/atoms/playlistAtoms";
import { selectedTracksAtom } from "../common/atoms/trackAtoms";
import { userIdAtom } from "../common/atoms/userAtoms";
import ContextMenu from "../menus/ContextMenu";
import { AnchorPointMenuProps } from "../menus/useContextMenu";
import TrackMenuItems from "../table/menus/TrackMenuItems";
import useTableRowLikedState from "../table/useTableRowLikedState";

type StreamedTrackContextMenuProps = {
    track: StreamedTrackDto;
    menuProps: AnchorPointMenuProps;
};

function StreamedTrackContextMenu({ track, menuProps }: StreamedTrackContextMenuProps) {
    const getLikedState = useTableRowLikedState();
    const setSelectedTracks = useSetAtom(selectedTracksAtom);

    const userId = useAtomValue(userIdAtom);
    const cachedPlaylists = useAtomValue(cachedPlaylistsAtom);
    const cachedPlaylist = cachedPlaylists.find((p) => p.id === track.context?.id);

    const isContextEditable = cachedPlaylist?.ownerId === userId;

    useEffect(() => {
        if (menuProps.state === "open") {
            setSelectedTracks([]);
        }
    }, [menuProps, setSelectedTracks]);

    return (
        <ContextMenu menuProps={menuProps}>
            <TrackMenuItems
                tracks={[track]}
                likedStates={[getLikedState(track.id, track.playbackId)]}
                playlistIdForRemovals={isContextEditable ? cachedPlaylist.id : undefined}
            />
        </ContextMenu>
    );
}

export default StreamedTrackContextMenu;
