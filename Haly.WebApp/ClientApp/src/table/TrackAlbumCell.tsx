import { Link } from "react-router-dom";

import { PlaylistTrackDto } from "../../generated/haly";
import { styled } from "../common/theme";

type TrackAlbumCellProps = {
    track: PlaylistTrackDto;
};

function TrackAlbumCell({ track }: TrackAlbumCellProps) {
    return (
        <Wrapper>
            {track.type === "Song" ? (
                <Link className="line-clamp-ellipsis" to={`/album/${track.album.id}`}>
                    {track.album.name}
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
    },
});

export default TrackAlbumCell;
