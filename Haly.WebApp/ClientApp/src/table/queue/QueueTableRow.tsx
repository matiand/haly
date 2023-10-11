import clsx from "clsx";

import { TrackDto } from "../../../generated/haly";
import TrackAlbumCell from "../TrackAlbumCell";
import TrackDurationCell from "../TrackDurationCell";
import TrackIndexCell from "../TrackIndexCell";
import TrackInformation from "../TrackInformation";
import { TrackLikedState } from "../useTableRowLikedState";
import { TrackPlaybackState } from "../useTableRowPlaybackState";
import useTrackSelection from "../useTrackSelection";

type QueueTableRowProps = {
    index: number;
    track: TrackDto;
    playbackState: TrackPlaybackState;
    likedState: TrackLikedState;
};

function QueueTableRow({ index, track, playbackState, likedState }: QueueTableRowProps) {
    const { isSelected, selectTrack } = useTrackSelection(index);

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
