import clsx from "clsx";

import { TrackDto } from "../../../generated/haly";
import TrackAlbumCell from "../TrackAlbumCell";
import TrackDurationCell from "../TrackDurationCell";
import TrackInformation from "../TrackInformation";

type RecentlyPlayedTrackRowProps = {
    track: TrackDto;
};

function ReadOnlyTableRow({ track }: RecentlyPlayedTrackRowProps) {
    return (
        <tr className={clsx({ disabled: !track.isPlayable })}>
            <td>
                <TrackInformation track={track} type="cell" showExplicitMark={track.isExplicit} />
            </td>
            <td>
                <TrackAlbumCell track={track} />
            </td>
            <td>
                <TrackDurationCell track={track} noActions />
            </td>
        </tr>
    );
}

export default ReadOnlyTableRow;
