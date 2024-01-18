import clsx from "clsx";
import { useAtomValue } from "jotai";
import React from "react";

import { PlaylistTrackDto } from "../../../generated/haly";
import { playlistSearchTermAtom } from "../../common/atoms/playlistAtoms";
import { styled } from "../../common/theme";
import useDraggable from "../../dnd/useDraggable";
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
    position: number;
    track: PlaylistTrackDto;
    playbackState: TrackPlaybackState;
    likedState: TrackLikedState;
    isSelected: boolean;
    selectTrack: (e: React.MouseEvent<HTMLTableRowElement>) => void;
    offsetY: number;
};

function PlaylistTableRow({
    position,
    track,
    playbackState,
    likedState,
    isSelected,
    selectTrack,
    // todo: rename to offsetY
    offsetY,
}: PlaylistTableRowProps) {
    const searchTerm = useAtomValue(playlistSearchTermAtom);
    const { togglePlayback, updatePlayback } = useTrackPlaybackActions(playbackState, track);
    const { onContextMenu, menuProps } = useContextMenu();

    const isSongWithId = track.isSong && track.id;

    const { draggableRef, ...draggableProps } = useDraggable(
        isSongWithId
            ? {
                  id: `playlist-table-row:${track.positionInPlaylist}`,
                  data: {
                      id: track.id!,
                      type: "table-row",
                      title: [track.name, track.artists[0].name],
                  },
              }
            : undefined,
    );

    return (
        <TableRow
            ref={draggableRef}
            {...draggableProps}
            onClick={selectTrack}
            onDoubleClick={updatePlayback}
            onContextMenu={(e) => {
                if (isSongWithId) {
                    !isSelected && selectTrack(e);
                    onContextMenu(e);
                }
            }}
            style={{ transform: `translateY(${offsetY}px` }}
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
        </TableRow>
    );
}

const TableRow = styled("tr", {
    "&&&": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
    },
});

export default PlaylistTableRow;
