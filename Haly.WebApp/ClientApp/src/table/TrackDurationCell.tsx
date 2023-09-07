import clsx from "clsx";

import { AlbumTrackDto, PlaylistTrackDto, TrackDto } from "../../generated/haly";
import HeartButton from "../common/HeartButton";
import MoreOptionsButton from "../common/MoreOptionsButton";
import { styled } from "../common/theme";

type TrackDurationCellProps = {
    track: TrackDto | PlaylistTrackDto | AlbumTrackDto;
    noActions?: boolean;
};

function TrackDurationCell({ track, noActions }: TrackDurationCellProps) {
    if (noActions) {
        return (
            <Wrapper>
                <Duration className={clsx({ noActions })}>{track.duration}</Duration>
            </Wrapper>
        );
    }

    return (
        <Wrapper>
            <HeartButton size="small" />
            <Duration>{track.duration}</Duration>
            <MoreOptionsButton label={`More options for track ${track.name}`} size="small" />
        </Wrapper>
    );
}

const Wrapper = styled("div", {
    alignItems: "center",
    color: "$white400",
    display: "flex",

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
