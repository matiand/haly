import { CellContext } from "@tanstack/react-table";
import { Link } from "react-router-dom";

import { TrackDto } from "../../generated/haly";
import { styled } from "../common/theme";

function TrackAlbumCell(ctx: CellContext<TrackDto, unknown>) {
    const track = ctx.row.original;
    return (
        <Wrapper className="truncate">
            <Link to={`/album/${track.album.id}`}>{track.album.name}</Link>
        </Wrapper>
    );
}

const Wrapper = styled("div", {
    "& a": {
        color: "$white500",
        fontSize: "$300",
        fontWeight: 500,
        textDecoration: "none",

        "&:hover": {
            textDecoration: "underline",
        },
    },
});

export default TrackAlbumCell;
