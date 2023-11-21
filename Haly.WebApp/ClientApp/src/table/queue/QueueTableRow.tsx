import clsx from "clsx";
import { useAtomValue } from "jotai";
import React from "react";

import { TrackDto } from "../../../generated/haly";
import { playbackContextUriAtom } from "../../common/atoms/playbackAtoms";
import { useTrackPlaybackActions } from "../../playback/usePlaybackActions";
import TrackAlbumCell from "../TrackAlbumCell";
import TrackDurationCell from "../TrackDurationCell";
import TrackIndexCell from "../TrackIndexCell";
import TrackInformation from "../TrackInformation";
import { TrackLikedState } from "../useTableRowLikedState";
import { TrackPlaybackState } from "../useTableRowPlaybackState";

type QueueTableRowProps = {
    position: number;
    track: TrackDto;
    playbackState: TrackPlaybackState;
    likedState: TrackLikedState;
    isSelected: boolean;
    selectTrack: (e: React.MouseEvent<HTMLTableRowElement>) => void;
};

function QueueTableRow({ position, track, playbackState, likedState, isSelected, selectTrack }: QueueTableRowProps) {
    const contextUri = useAtomValue(playbackContextUriAtom);
    const { togglePlayback, updatePlayback } = useTrackPlaybackActions(playbackState, track, contextUri);

    return (
        <tr
            onClick={selectTrack}
            onDoubleClick={updatePlayback}
            className={clsx({
                disabled: !track.isPlayable,
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
                    isListenedTo={playbackState !== "none"}
                    showExplicitMark={track.isExplicit}
                />
            </td>
            <td>
                <TrackAlbumCell track={track} />
            </td>
            <td>
                <TrackDurationCell track={track} likedState={likedState} />
            </td>
        </tr>
    );
}

export default QueueTableRow;
