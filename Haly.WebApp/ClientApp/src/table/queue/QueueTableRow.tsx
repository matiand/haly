import clsx from "clsx";

import { TrackDto } from "../../../generated/haly";
import { PlaybackContextState } from "../../common/usePlaybackContextState";
import TrackAlbumCell from "../TrackAlbumCell";
import TrackDurationCell from "../TrackDurationCell";
import TrackIndexCell from "../TrackIndexCell";
import TrackInformation from "../TrackInformation";
import useSelectingTrack from "../useSelectingTrack";

type QueueTableRowProps = {
    index: number;
    track: TrackDto;
    playbackState: PlaybackContextState;
};

function QueueTableRow({ index, track, playbackState }: QueueTableRowProps) {
    const { isSelected, selectTrack } = useSelectingTrack(index);

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
                <TrackDurationCell track={track} />
            </td>
        </tr>
    );
}

export default QueueTableRow;
