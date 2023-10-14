import clsx from "clsx";
import { LuDisc } from "react-icons/lu";

import { AlbumTrackDto } from "../../../generated/haly";
import { styled } from "../../common/theme";
import { useTrackPlaybackActions } from "../../playback/usePlaybackActions";
import TrackDurationCell from "../TrackDurationCell";
import TrackIndexCell from "../TrackIndexCell";
import TrackInformation from "../TrackInformation";
import { TrackLikedState } from "../useTableRowLikedState";
import { TrackPlaybackState } from "../useTableRowPlaybackState";
import useTrackSelection from "../useTrackSelection";

type TrackRowProps = {
    index: number;
    track: AlbumTrackDto;
    playbackState: TrackPlaybackState;
    likedState: TrackLikedState;
};

export function AlbumTableTrackRow({ index, track, playbackState, likedState }: TrackRowProps) {
    const { isSelected, selectTrack } = useTrackSelection(index);
    const { togglePlayback, updatePlayback } = useTrackPlaybackActions(playbackState, track);

    return (
        <tr
            onClick={selectTrack}
            onDoubleClick={updatePlayback}
            className={clsx({
                disabled: !track.isPlayable,
                isSelected,
            })}
        >
            <td>
                <TrackIndexCell
                    index={index}
                    track={track}
                    playbackState={playbackState}
                    playbackAction={togglePlayback}
                />
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
                <TrackDurationCell track={track} likedState={likedState} />
            </td>
        </tr>
    );
}

type DiscRowProps = {
    discNumber: number;
};

export function AlbumTableDiscRow({ discNumber }: DiscRowProps) {
    return (
        <DiscRow>
            <td>
                <span aria-hidden>
                    <LuDisc />
                </span>
            </td>
            <td colSpan={2}>Disc {discNumber}</td>
        </DiscRow>
    );
}

const DiscRow = styled("tr", {
    "&& > td[colspan]": {
        color: "$white500",
        fontWeight: 700,
        justifySelf: "initial",
        letterSpacing: "0.04em",
    },

    "&&:hover": {
        background: "initial",
    },

    "& svg": {
        height: "18px",
        width: "18px",
    },
});
