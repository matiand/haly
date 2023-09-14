import clsx from "clsx";

import { TrackDto } from "../../../generated/haly";
import TrackAlbumCell from "../TrackAlbumCell";
import TrackDurationCell from "../TrackDurationCell";
import TrackIndexCell from "../TrackIndexCell";
import TrackInformation from "../TrackInformation";

type QueueTableRowProps = {
    index: number;
    track: TrackDto;
    isListenedTo?: boolean;
};

function QueueTableRow({ index, track, isListenedTo }: QueueTableRowProps) {
    return (
        <tr className={clsx({ disabled: !track.isPlayable })}>
            <td>
                <TrackIndexCell index={index} track={track} isListenedTo={isListenedTo} />
            </td>
            <td>
                <TrackInformation
                    track={track}
                    type="cell"
                    isListenedTo={isListenedTo}
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
