import clsx from "clsx";

import { TrackDto } from "../../../generated/haly";
import { PlaybackContextState } from "../../common/usePlaybackContextState";
import { TrackLikedState } from "../../common/useTableRowLikedState";
import TrackDurationCell from "../TrackDurationCell";
import TrackIndexCell from "../TrackIndexCell";
import TrackInformation from "../TrackInformation";

type TrackRowProps = {
    index: number;
    track: TrackDto;
    playbackState: PlaybackContextState;
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
