import clsx from "clsx";

import { TrackDto } from "../../../generated/haly";
import TrackDurationCell from "../TrackDurationCell";
import TrackIndexCell from "../TrackIndexCell";
import TrackInformation from "../TrackInformation";
import { TrackLikedState } from "../useTableRowLikedState";
import { TrackPlaybackState } from "../useTableRowPlaybackState";
import useTrackSelection from "../useTrackSelection";

type TrackRowProps = {
    index: number;
    track: TrackDto;
    playbackState: TrackPlaybackState;
    likedState: TrackLikedState;
};

function TopTracksTableRow({ index, track, playbackState, likedState }: TrackRowProps) {
    const { isSelected, selectTrack } = useTrackSelection(index);
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
                <TrackIndexCell index={index} track={track} playbackState={playbackState} />
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
