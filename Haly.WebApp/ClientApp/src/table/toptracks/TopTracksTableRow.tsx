import clsx from "clsx";
import React from "react";

import { TrackDto } from "../../../generated/haly";
import useDraggable from "../../dnd/useDraggable";
import useContextMenu from "../../menus/useContextMenu";
import TrackContextMenu from "../menus/TrackContextMenu";
import TrackDurationCell from "../TrackDurationCell";
import TrackIndexCell from "../TrackIndexCell";
import TrackInformation from "../TrackInformation";
import { TrackLikedState } from "../useTableRowLikedState";
import { TrackPlaybackState } from "../useTableRowPlaybackState";

type TrackRowProps = {
    position: number;
    track: TrackDto;
    playbackState: TrackPlaybackState;
    likedState: TrackLikedState;
    isSelected: boolean;
    selectTrack: (e: React.MouseEvent<HTMLTableRowElement>) => void;
};

function TopTracksTableRow({ position, track, playbackState, likedState, isSelected, selectTrack }: TrackRowProps) {
    const { onContextMenu, menuProps } = useContextMenu();
    // Playback of individual tracks is not allowed for this table. Their api doesn't allow it.

    const { draggableRef, ...draggableProps } = useDraggable({
        id: `top-tracks-table-row:${track.id}`,
        data: {
            id: track.id!,
            type: "table-row",
            title: [track.name, track.artists[0].name],
        },
    });

    return (
        <tr
            ref={draggableRef}
            {...draggableProps}
            onClick={selectTrack}
            onContextMenu={(e) => {
                !isSelected && selectTrack(e);
                onContextMenu(e);
            }}
            className={clsx({
                isDisabled: !track.isPlayable,
                isListenedTo: playbackState !== "none",
                isSelected,
            })}
        >
            <td>
                <TrackIndexCell position={position} track={track} playbackState={playbackState} />
            </td>

            <td>
                <TrackInformation track={track} type="cell" showExplicitMark={track.isExplicit} hideArtists />
            </td>

            <td>
                <TrackDurationCell track={track} likedState={likedState} />
            </td>

            <TrackContextMenu track={track} menuProps={menuProps} />
        </tr>
    );
}

export default TopTracksTableRow;
