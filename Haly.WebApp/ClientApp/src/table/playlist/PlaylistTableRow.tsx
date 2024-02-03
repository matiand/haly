import clsx from "clsx";
import { useAtomValue } from "jotai";
import React from "react";
import isDeepEqual from "react-fast-compare";

import { PlaylistTrackDto } from "../../../generated/haly";
import { playlistSearchTermAtom } from "../../common/atoms/playlistAtoms";
import DraggableTableRow from "../../dnd/DraggableTableRow";
import { DraggableHookParams } from "../../dnd/useDraggable";
import useContextMenu from "../../menus/useContextMenu";
import { useTrackPlaybackActions } from "../../playback/usePlaybackActions";
import TrackContextMenu from "../menus/TrackContextMenu";
import TrackAlbumCell from "../TrackAlbumCell";
import TrackDateAddedCell from "../TrackDateAddedCell";
import TrackDurationCell from "../TrackDurationCell";
import TrackIndexCell from "../TrackIndexCell";
import TrackInformation from "../TrackInformation";
import { TrackLikedState } from "../useTableRowLikedState";
import { TrackPlaybackState } from "../useTableRowPlaybackState";

type PlaylistTableRowProps = {
    index: number;
    position: number;
    track: PlaylistTrackDto;
    playbackState: TrackPlaybackState;
    likedState: TrackLikedState;
    isSelected: boolean;
    selectTrack: (index: number, e: React.MouseEvent<HTMLTableRowElement>) => void;
    offsetY: number;
};

function PlaylistTableRow({
    index,
    position,
    track,
    playbackState,
    likedState,
    isSelected,
    selectTrack,
    offsetY,
}: PlaylistTableRowProps) {
    const searchTerm = useAtomValue(playlistSearchTermAtom);
    const { togglePlayback, updatePlayback } = useTrackPlaybackActions(playbackState, track);
    const { onContextMenu, menuProps } = useContextMenu();

    const isSongWithId = track.isSong && track.id;

    const draggableParams: DraggableHookParams | undefined = isSongWithId
        ? {
              id: `playlist-table-row:${track.positionInPlaylist}`,
              data: {
                  id: track.id!,
                  type: "table-row",
                  title: [track.name, track.artists[0].name],
              },
          }
        : undefined;

    return (
        <DraggableTableRow
            draggableParams={draggableParams}
            onClick={(e) => selectTrack(index, e)}
            onDoubleClick={updatePlayback}
            onContextMenu={(e) => {
                if (isSongWithId) {
                    !isSelected && selectTrack(index, e);
                    onContextMenu(e);
                }
            }}
            style={{
                position: "absolute",
                top: 0,
                transform: `translateY(${offsetY}px`,
                left: 0,
                width: "100%",
            }}
            className={clsx({
                isDisabled: !track.isPlayable,
                isListenedTo: playbackState !== "none",
                isSelected,
            })}
        >
            <td>
                <TrackIndexCell
                    position={position}
                    track={track}
                    playbackState={playbackState}
                    playbackAction={togglePlayback}
                />
            </td>

            <td>
                <TrackInformation
                    track={track}
                    type="cell"
                    showExplicitMark={track.isExplicit}
                    hideArtists={!isSongWithId}
                    searchTerm={searchTerm}
                />
            </td>

            <td>
                <TrackAlbumCell track={track} searchTerm={searchTerm} />
            </td>

            <td>
                <TrackDateAddedCell track={track} />
            </td>

            <td>
                <TrackDurationCell track={track} noActions={!isSongWithId} likedState={likedState} />
            </td>

            <TrackContextMenu track={track} menuProps={menuProps} />
        </DraggableTableRow>
    );
}

export default React.memo(PlaylistTableRow, isDeepEqual);
