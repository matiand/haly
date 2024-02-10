import { useSetAtom } from "jotai";
import { useEffect } from "react";

import { TrackDto } from "../../generated/haly";
import { StreamedTrackDto, StreamedTrackWithIdDto } from "../common/atoms/playbackAtoms";
import { selectedTracksAtom } from "../common/atoms/trackAtoms";
import ContextMenu from "../menus/ContextMenu";
import { AnchorPointMenuProps } from "../menus/useContextMenu";
import TrackMenuItems from "../table/menus/TrackMenuItems";
import { TrackLikedState } from "../table/useTableRowLikedState";

type StreamedTrackContextMenuProps = {
    track: StreamedTrackDto;
    trackId: NonNullable<TrackDto["id"]>;
    likedState: TrackLikedState;
    menuProps: AnchorPointMenuProps;
    isTrackMovable: boolean;
};

function StreamedTrackContextMenu({
    track,
    trackId,
    likedState,
    menuProps,
    isTrackMovable,
}: StreamedTrackContextMenuProps) {
    const setSelectedTracks = useSetAtom(selectedTracksAtom);
    useEffect(() => {
        if (menuProps.state === "open") {
            setSelectedTracks([]);
        }
    }, [menuProps, setSelectedTracks]);

    const trackWithId: StreamedTrackWithIdDto = { ...track, id: trackId, uri: `spotify:track:${trackId}` };

    return (
        <ContextMenu menuProps={menuProps}>
            <TrackMenuItems
                tracks={[trackWithId]}
                likedStates={[likedState]}
                playlistIdForRemovals={isTrackMovable ? trackWithId.context?.id : undefined}
            />
        </ContextMenu>
    );
}

export default StreamedTrackContextMenu;
