import clsx from "clsx";

import { TrackDto } from "../../../generated/haly";
import TrackDurationCell from "../TrackDurationCell";
import TrackIndexCell from "../TrackIndexCell";
import TrackInformation from "../TrackInformation";
import { TrackLikedState } from "../useTableRowLikedState";
import { TrackPlaybackState } from "../useTableRowPlaybackState";

type TrackRowProps = {
    index: number;
    track: TrackDto;
    playbackState: TrackPlaybackState;
    likedState: TrackLikedState;
};

function TopTracksTableRow({ index, track, playbackState, likedState }: TrackRowProps) {
    return (
        <tr className={clsx({ disabled: !track.isPlayable })}>
            <td>
                <TrackIndexCell index={index} track={track} playbackState={playbackState} />
            </td>

            <td>
                <TrackInformation
                    track={track}
                    type="cell"
                    showExplicitMark={track.isExplicit}
                    hideArtists
                    isListenedTo={playbackState !== "none"}
                />
            </td>

            <td>
                <TrackDurationCell track={track} likedState={likedState} />
            </td>
        </tr>
    );
}

export default TopTracksTableRow;
