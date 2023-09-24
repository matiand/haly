import clsx from "clsx";

import { TrackDto } from "../../../generated/haly";
import { PlaybackContextState } from "../../common/usePlaybackContextState";
import TrackDurationCell from "../TrackDurationCell";
import TrackIndexCell from "../TrackIndexCell";
import TrackInformation from "../TrackInformation";

type TrackRowProps = {
    index: number;
    track: TrackDto;
    playbackState: PlaybackContextState;
};

function TopTracksTableRow({ index, track, playbackState }: TrackRowProps) {
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
                <TrackDurationCell track={track} />
            </td>
        </tr>
    );
}

export default TopTracksTableRow;
