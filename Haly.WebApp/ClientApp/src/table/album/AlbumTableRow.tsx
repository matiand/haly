import clsx from "clsx";
import React from "react";
import isDeepEqual from "react-fast-compare";

import { AlbumTrackDto } from "../../../generated/haly";
import DraggableTableRow from "../../dnd/DraggableTableRow";
import { DraggableHookParams } from "../../dnd/useDraggable";
import useContextMenu from "../../menus/useContextMenu";
import { useTrackPlaybackActions } from "../../playback/usePlaybackActions";
import TrackContextMenu from "../menus/TrackContextMenu";
import PlaybackCell from "../PlaybackCell";
import TrackDurationCell from "../TrackDurationCell";
import TrackInformationCell from "../TrackInformationCell";
import { TrackLikedState } from "../useTableRowLikedState";
import { TrackPlaybackState } from "../useTableRowPlaybackState";

type AlbumTableRowProps = {
    index: number;
    position: number;
    track: AlbumTrackDto;
    playbackState: TrackPlaybackState;
    likedState: TrackLikedState;
    isSelected: boolean;
    selectTrack: (index: number, e: React.MouseEvent<HTMLTableRowElement>) => void;
};

function AlbumTableRow({
    index,
    position,
    track,
    playbackState,
    likedState,
    isSelected,
    selectTrack,
}: AlbumTableRowProps) {
    const { togglePlayback, updatePlayback } = useTrackPlaybackActions(playbackState, track);
    const { menuProps, onContextMenu } = useContextMenu();

    const draggableParams: DraggableHookParams = {
        id: `album-table-row:${track.id}`,
        data: {
            id: track.id,
            type: "table-row",
            title: [track.name, track.artists[0].name],
        },
    };

    return (
        <DraggableTableRow
            draggableParams={draggableParams}
            onClick={(e) => selectTrack(index, e)}
            onDoubleClick={updatePlayback}
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
                <PlaybackCell
                    position={position}
                    name={track.name}
                    playbackState={playbackState}
                    playbackAction={togglePlayback}
                />
            </td>

            <td>
                <TrackInformationCell track={track} showExplicitMark={track.isExplicit} showArtists />
            </td>

            <td>
                <TrackDurationCell track={track} likedState={likedState} />
            </td>

            <TrackContextMenu track={track} menuProps={menuProps} />
        </DraggableTableRow>
    );
}

export default React.memo(AlbumTableRow, isDeepEqual);
