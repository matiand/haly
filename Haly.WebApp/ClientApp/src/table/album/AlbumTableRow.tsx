import clsx from "clsx";
import React from "react";
import { LuDisc } from "react-icons/lu";

import { AlbumTrackDto } from "../../../generated/haly";
import { styled } from "../../common/theme";
import useDraggable from "../../dnd/useDraggable";
import useContextMenu from "../../menus/useContextMenu";
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
    const { menuProps, onContextMenu } = useContextMenu();

    const { draggableRef, ...draggableProps } = useDraggable({
        id: `album-row-${position}`,
        data: {
            id: track.id,
            type: "table-row",
            title: [track.name, track.artists[0].name],
        },
    });

    return (
        <tr
            ref={draggableRef}
            {...draggableProps}
            onClick={selectTrack}
            onDoubleClick={updatePlayback}
            onContextMenu={(e) => {
                !isSelected && selectTrack(e);
                onContextMenu(e);
            }}
            className={clsx({
                isDisabled: !track.isPlayable,
                isListenedTo: playbackState !== "none",
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
                <TrackInformation track={track} type="cell" showExplicitMark={track.isExplicit} />
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
    marginTop: "$400",

    "&& > td[colspan]": {
        color: "$white500",
        fontWeight: 700,
        justifySelf: "start",
        letterSpacing: "0.04em",
    },

    "&&:hover": {
        background: "transparent",
    },

    "& svg": {
        color: "$white500",
        height: "18px",
        width: "18px",
    },
});
