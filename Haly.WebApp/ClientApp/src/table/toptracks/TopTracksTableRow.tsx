import clsx from "clsx";
import React from "react";

import { TrackDto } from "../../../generated/haly";
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
    // Playback of individual tracks is not allowed for this table. Their api doesn't allow it.

    const isListenedTo = playbackState !== "none";

    return (
        <tr
            onClick={selectTrack}
            className={clsx({
                disabled: !track.isPlayable,
                isSelected,
            })}
        >
            <td>
                <TrackIndexCell position={position} track={track} playbackState={playbackState} />
            </td>

            <td>
                <TrackInformation
                    track={track}
                    type="cell"
                    showExplicitMark={track.isExplicit}
                    hideArtists
                    isListenedTo={isListenedTo}
                />
            </td>

            <td>
                <TrackDurationCell track={track} likedState={likedState} />
            </td>
        </tr>
    );
}

export default TopTracksTableRow;
