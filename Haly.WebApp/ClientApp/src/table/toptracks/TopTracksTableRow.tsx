import clsx from "clsx";

import { TrackDto } from "../../../generated/haly";
import TrackDurationCell from "../TrackDurationCell";
import TrackIndexCell from "../TrackIndexCell";
import TrackInformation from "../TrackInformation";

type TrackRowProps = {
    index: number;
    track: TrackDto;
};

function TopTracksTableRow({ index, track }: TrackRowProps) {
    return (
        <tr className={clsx({ disabled: !track.isPlayable })}>
            <td>
                <TrackIndexCell index={index} track={track} />
            </td>

            <td>
                <TrackInformation track={track} type="cell" showExplicitMark={track.isExplicit} hideArtists />
            </td>

            <td>
                <TrackDurationCell track={track} />
            </td>
        </tr>
    );
}

export default TopTracksTableRow;
