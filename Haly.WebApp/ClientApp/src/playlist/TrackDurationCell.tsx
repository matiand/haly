import { CellContext } from "@tanstack/react-table";

import { TrackDto } from "../../generated/haly";
import HeartButton from "../common/HeartButton";
import MoreOptionsButton from "../common/MoreOptionsButton";
import { styled } from "../common/theme";

function TrackDurationCell(ctx: CellContext<TrackDto, unknown>) {
    const track = ctx.row.original;

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
    display: "flex",

    "& > :first-child": {
        alignItems: "center",
        display: "flex",
        marginRight: "$600",
    },
});

const Duration = styled("span", {
    color: "$white700",
    fontSize: "$300",
    fontVariantNumeric: "tabular-nums",
    marginRight: "$600",
    textAlign: "end",
    width: "4.5ch",
});

export default TrackDurationCell;
