import { CellContext } from "@tanstack/react-table";
import { Link } from "react-router-dom";

import { PlaylistTrackDto } from "../../generated/haly";
import { styled } from "../common/theme";

function TrackAlbumCell(ctx: CellContext<PlaylistTrackDto, unknown>) {
    const track = ctx.row.original;
    return (
        <Wrapper>
            <Link className="line-clamp-ellipsis" to={`/album/${track.album.id}`}>
                {track.album.name}
            </Link>
        </Wrapper>
    );
}

const Wrapper = styled("span", {
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
