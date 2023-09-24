import clsx from "clsx";

import { TrackDto } from "../../../generated/haly";
import { PlaybackContextState } from "../../common/usePlaybackContextState";
import TrackAlbumCell from "../TrackAlbumCell";
import TrackDurationCell from "../TrackDurationCell";
import TrackIndexCell from "../TrackIndexCell";
import TrackInformation from "../TrackInformation";

type QueueTableRowProps = {
    index: number;
    track: TrackDto;
    playbackState: PlaybackContextState;
};

function QueueTableRow({ index, track, playbackState }: QueueTableRowProps) {
    return (
        <tr className={clsx({ disabled: !track.isPlayable })}>
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
