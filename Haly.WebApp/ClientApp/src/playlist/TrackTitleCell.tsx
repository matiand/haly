import { CellContext } from "@tanstack/react-table";
import { Link } from "react-router-dom";

import { TrackDto } from "../../generated/haly";
import { styled } from "../common/theme";
import AlbumCover from "./AlbumCover";

export function TrackTitleCell(ctx: CellContext<TrackDto, unknown>) {
    const track = ctx.row.original;

    return (
        <Wrapper>
            <AlbumCover imageUrl={track.album.imageUrl} />
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

export const TrackTitleHeader = "title";

const Wrapper = styled("div", {
    alignItems: "center",
    display: "flex",
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
