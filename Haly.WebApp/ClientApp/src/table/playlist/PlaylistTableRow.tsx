import clsx from "clsx";
import { useAtomValue } from "jotai";
import React from "react";
import isDeepEqual from "react-fast-compare";

import { PlaylistTrackDto } from "../../../generated/haly";
import { playlistSearchTermAtom } from "../../common/atoms/playlistAtoms";
import DraggableTableRow from "../../dnd/DraggableTableRow";
import { DraggableHookParams } from "../../dnd/useDraggable";
import useContextMenu from "../../menus/useContextMenu";
import { useTrackPlayback } from "../../playback/usePlaybackMutations";
import DateCell from "../DateCell";
import TrackContextMenu from "../menus/TrackContextMenu";
import PlaybackCell from "../PlaybackCell";
import TrackAlbumCell from "../TrackAlbumCell";
import TrackDurationCell from "../TrackDurationCell";
import TrackInformationCell from "../TrackInformationCell";
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

    const { togglePlayback, updatePlayback } = useTrackPlayback({
        track,
        trackPlaybackState: playbackState,
    });

    const { onContextMenu, menuProps } = useContextMenu();

    const isSongWithId = Boolean(track.isSong && track.id);
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
                <PlaybackCell
                    position={position}
                    name={track.name}
                    playbackState={playbackState}
                    playbackAction={togglePlayback}
                    isPodcast={!track.isSong}
                />
            </td>

            <td>
                <TrackInformationCell
                    track={track}
                    showExplicitMark={track.isExplicit}
                    showArtists={isSongWithId}
                    searchTerm={searchTerm}
                />
            </td>

            <td>
                <TrackAlbumCell track={track} searchTerm={searchTerm} />
            </td>

            <td>
                <DateCell date={track.addedAt} />
            </td>

            <td>
                <TrackDurationCell track={track} noActions={!isSongWithId} likedState={likedState} />
            </td>

            <TrackContextMenu track={track} menuProps={menuProps} />
        </DraggableTableRow>
    );
}

export default React.memo(PlaylistTableRow, isDeepEqual);
