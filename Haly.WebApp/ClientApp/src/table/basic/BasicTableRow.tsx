import clsx from "clsx";
import React from "react";
import isDeepEqual from "react-fast-compare";

import { TrackDto } from "../../../generated/haly";
import DraggableTableRow from "../../dnd/DraggableTableRow";
import { DraggableHookParams } from "../../dnd/useDraggable";
import useContextMenu from "../../menus/useContextMenu";
import TrackContextMenu from "../menus/TrackContextMenu";
import TrackAlbumCell from "../TrackAlbumCell";
import TrackDurationCell from "../TrackDurationCell";
import TrackIndexCell from "../TrackIndexCell";
import TrackInformationCell from "../TrackInformationCell";
import { TrackLikedState } from "../useTableRowLikedState";
import { TrackPlaybackState } from "../useTableRowPlaybackState";

type BasicTableRowProps = {
    index: number;
    track: TrackDto;
    playbackState: TrackPlaybackState;
    likedState: TrackLikedState;
    isSelected: boolean;
    selectTrack: (index: number, e: React.MouseEvent<HTMLTableRowElement>) => void;
    withAlbumCell?: boolean;
    showArtists?: boolean;
};

function BasicTableRow({
    index,
    track,
    playbackState,
    likedState,
    isSelected,
    selectTrack,
    withAlbumCell,
    showArtists,
}: BasicTableRowProps) {
    const { onContextMenu, menuProps } = useContextMenu();
    // Playback of individual tracks is not allowed for this table. Their api doesn't allow it.

    const draggableParams: DraggableHookParams = {
        id: `top-tracks-table-row:${track.id}`,
        data: {
            id: track.id!,
            type: "table-row",
            title: [track.name, track.artists[0].name],
        },
    };

    const position = index + 1;

    return (
        <DraggableTableRow
            draggableParams={draggableParams}
            onClick={(e) => selectTrack(index, e)}
            onContextMenu={(e) => {
                !isSelected && selectTrack(index, e);
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
                <TrackInformationCell track={track} showExplicitMark={track.isExplicit} showArtists={showArtists} />
            </td>

            {withAlbumCell && (
                <td>
                    <TrackAlbumCell track={track} />
                </td>
            )}

            <td>
                <TrackDurationCell track={track} likedState={likedState} />
            </td>

            <TrackContextMenu track={track} menuProps={menuProps} />
        </DraggableTableRow>
    );
}

export default React.memo(BasicTableRow, isDeepEqual);
