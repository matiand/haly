import clsx from "clsx";
import React from "react";
import { LuDisc } from "react-icons/lu";

import { AlbumTrackDto } from "../../../generated/haly";
import { styled } from "../../common/theme";
import UseContextMenu from "../../menus/useContextMenu";
import { useTrackPlaybackActions } from "../../playback/usePlaybackActions";
import TrackContextMenu from "../menus/TrackContextMenu";
import TrackDurationCell from "../TrackDurationCell";
import TrackIndexCell from "../TrackIndexCell";
import TrackInformation from "../TrackInformation";
import { TrackLikedState } from "../useTableRowLikedState";
import { TrackPlaybackState } from "../useTableRowPlaybackState";

type TrackRowProps = {
    position: number;
    track: AlbumTrackDto;
    playbackState: TrackPlaybackState;
    likedState: TrackLikedState;
    isSelected: boolean;
    selectTrack: (e: React.MouseEvent<HTMLTableRowElement>) => void;
};

export function AlbumTableTrackRow({
    position,
    track,
    playbackState,
    likedState,
    isSelected,
    selectTrack,
}: TrackRowProps) {
    const { togglePlayback, updatePlayback } = useTrackPlaybackActions(playbackState, track);
    const { menuProps, onContextMenu } = UseContextMenu();

    return (
        <tr
            onClick={selectTrack}
            onDoubleClick={updatePlayback}
            onContextMenu={(e) => {
                !isSelected && selectTrack(e);
                onContextMenu(e);
            }}
            className={clsx({
                disabled: !track.isPlayable,
                isSelected,
            })}
        >
            <td>
                <TrackIndexCell
                    position={position}
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

            <TrackContextMenu track={track} menuProps={menuProps} />
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
