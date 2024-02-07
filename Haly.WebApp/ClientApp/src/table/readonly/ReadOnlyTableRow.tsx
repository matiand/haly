import clsx from "clsx";

import { TrackDto } from "../../../generated/haly";
import TrackAlbumCell from "../TrackAlbumCell";
import TrackDurationCell from "../TrackDurationCell";
import TrackInformationCell from "../TrackInformationCell";

type RecentlyPlayedTrackRowProps = {
    track: TrackDto;
};

function ReadOnlyTableRow({ track }: RecentlyPlayedTrackRowProps) {
    return (
        <tr className={clsx({ isDisabled: !track.isPlayable })}>
            <td>
                <TrackInformationCell track={track} showExplicitMark={track.isExplicit} showArtists />
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
