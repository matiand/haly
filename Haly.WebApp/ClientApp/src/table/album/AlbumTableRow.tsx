import clsx from "clsx";
import { LuDisc } from "react-icons/lu";

import { AlbumTrackDto } from "../../../generated/haly";
import { styled } from "../../common/theme";
import { PlaybackContextState } from "../../common/usePlaybackContextState";
import TrackDurationCell from "../TrackDurationCell";
import TrackIndexCell from "../TrackIndexCell";
import TrackInformation from "../TrackInformation";
import useSelectingTrack from "../useSelectingTrack";

type TrackRowProps = {
    index: number;
    track: AlbumTrackDto;
    playbackState: PlaybackContextState;
};

export function AlbumTableTrackRow({ index, track, playbackState }: TrackRowProps) {
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
                <TrackDurationCell track={track} />
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