import clsx from "clsx";

import { AlbumTrackDto, PlaylistTrackDto, TrackDto } from "../../generated/haly";
import { styled } from "../common/theme";
import { HeartMutationParams } from "../common/useHeartMutations";
import HeartButton from "../ui/HeartButton";
import MoreOptionsButton from "../ui/MoreOptionsButton";
import { TrackLikedState } from "./useTableRowLikedState";

type TrackDurationCellProps = {
    track: TrackDto | PlaylistTrackDto | AlbumTrackDto;
    likedState?: TrackLikedState;
    noActions?: boolean;
};

function TrackDurationCell({ track, noActions, likedState }: TrackDurationCellProps) {
    if (noActions || !likedState) {
        return (
            <Wrapper>
                <Duration className={clsx({ noActions })}>{track.duration}</Duration>
            </Wrapper>
        );
    }

    const heartBtnParams: HeartMutationParams = {
        type: "track",
        ids: [
            {
                likedId: likedState.likedId!,
                playbackId: track.playbackId!,
            },
        ],
    };

    return (
        <Wrapper>
            <HeartButton key={track.id!} params={heartBtnParams} initialState={likedState.isLiked} />
            <Duration>{track.duration}</Duration>
            <MoreOptionsButton label={`More options for track ${track.name}`} type="track" />
        </Wrapper>
    );
}

const Wrapper = styled("div", {
    alignItems: "center",
    color: "$white400",
    display: "flex",

    // Show the heart button when the user follows that track
    "& > button[aria-checked=true]": {
        opacity: 1,
    },

    "& > :first-child": {
        alignItems: "center",
        display: "flex",
        marginRight: "$600",
    },
});

const Duration = styled("span", {
    display: "flex",
    fontSize: "$300",
    fontWeight: 500,
    fontVariantNumeric: "tabular-nums",
    justifyContent: "flex-end",
    marginRight: "$600",
    textAlign: "end",
    width: "4.5ch",

    "&.noActions": {
        marginRight: "$800",
    },
});

export default TrackDurationCell;
