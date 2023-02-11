import { CellContext } from "@tanstack/react-table";
import { Link } from "react-router-dom";

import { TrackDto } from "../../generated/haly";
import { styled } from "../common/theme";
import TrackCoverImage from "../common/TrackCoverImage";

function TrackTitleCell(ctx: CellContext<TrackDto, unknown>) {
    const track = ctx.row.original;

    return (
        <Wrapper>
            <TrackCoverImage imageUrl={track.album.imageUrl} alt="Track cover image" />
            <TrackContents>
                <div className="truncate">{track.name}</div>
                {track.type === "Song" && (
                    <div className="truncate">
                        {track.artists.map(({ name, id }) => (
                            <Link key={id} to={`/artist/${id}`}>
                                {name}
                            </Link>
                        ))}
                    </div>
                )}
            </TrackContents>
        </Wrapper>
    );
}

const Wrapper = styled("div", {
    alignItems: "center",
    display: "flex",

    "& > *:first-child": {
        marginRight: "$600",
    },
});

const TrackContents = styled("div", {
    color: "$white",
    display: "flex",
    flexFlow: "column",
    fontSize: "$350",
    fontWeight: "500",
    paddingRight: "$400",

    "& a": {
        color: "$grey200",
        fontSize: "$200",
        textDecoration: "none",

        "&:hover": {
            textDecoration: "underline",
        },
    },
    "& a:not(:last-child):after": {
        content: ", ",
        display: "inline-block",
        width: "0.6em",
    },
});

export default TrackTitleCell;
