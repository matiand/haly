import { Link } from "react-router-dom";

import { PlaylistTrackDto, TrackDto } from "../../generated/haly";
import { styled } from "../common/theme";
import HighlightableText from "./HighlightableText";

type TrackAlbumCellProps = {
    track: PlaylistTrackDto | TrackDto;
    searchTerm?: string | null;
};

function TrackAlbumCell({ track, searchTerm }: TrackAlbumCellProps) {
    return (
        <Wrapper>
            {track.isSong ? (
                <Link className="line-clamp-ellipsis" to={`/album/${track.album.id}`}>
                    <HighlightableText text={track.album.name} markedText={searchTerm} />
                </Link>
            ) : (
                <span className="line-clamp-ellipsis">{track.album.name}</span>
            )}
        </Wrapper>
    );
}

const Wrapper = styled("span", {
    color: "$white500",
    fontSize: "$300",
    fontWeight: 500,

    "& a": {
        color: "inherit",
        textDecoration: "none",

        "&:hover": {
            textDecoration: "underline",
        },

        span: {
            display: "inline",
        },
    },
});

export default TrackAlbumCell;
