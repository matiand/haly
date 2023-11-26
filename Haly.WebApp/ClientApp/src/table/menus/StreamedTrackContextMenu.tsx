import { useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";

import { StreamedTrack } from "../../common/atoms/playbackAtoms";
import { cachedPlaylistsAtom } from "../../common/atoms/playlistAtoms";
import { selectedTracksAtom } from "../../common/atoms/trackAtoms";
import { userIdAtom } from "../../common/atoms/userAtoms";
import ContextMenu from "../../menus/ContextMenu";
import { AnchorPointMenuProps } from "../../menus/useContextMenu";
import useTableRowLikedState from "../useTableRowLikedState";
import TrackMenuItems from "./TrackMenuItems";

type StreamedTrackContextMenuProps = {
    track: StreamedTrack;
    menuProps: AnchorPointMenuProps;
};

function StreamedTrackContextMenu({ track, menuProps }: StreamedTrackContextMenuProps) {
    const getLikedState = useTableRowLikedState();
    const setSelectedTracks = useSetAtom(selectedTracksAtom);

    const userId = useAtomValue(userIdAtom);
    const cachedPlaylists = useAtomValue(cachedPlaylistsAtom);
    const cachedPlaylist = cachedPlaylists.find((p) => p.id === track.context?.id);

    const playlistIdIfBelongsToCurrentUser = cachedPlaylist?.ownerId === userId ? cachedPlaylist.id : undefined;

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
                playlistId={playlistIdIfBelongsToCurrentUser}
            />
        </ContextMenu>
    );
}

export default StreamedTrackContextMenu;
