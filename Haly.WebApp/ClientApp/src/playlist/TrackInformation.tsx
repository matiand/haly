import { Link } from "react-router-dom";

import { TrackDto } from "../../generated/haly";
import { styled } from "../common/theme";
import TrackCoverImage from "../common/TrackCoverImage";

type TrackInformationProps = {
    track: TrackDto;
    type: "cell" | "playback";
};

function TrackInformation({ track, type }: TrackInformationProps) {
    const { name, type: trackType, album, artists } = track;

    return (
        <Wrapper>
            <TrackCoverImage type={type} imageUrl={album.imageUrl} />
            <TrackContents type={type}>
                <div className="line-clamp-ellipsis">{name}</div>
                {trackType === "Song" && (
                    <span className="line-clamp-ellipsis">
                        {artists.map(({ name, id }) => (
                            <Link key={id} to={`/artist/${id}`}>
                                {name}
                            </Link>
                        ))}
                    </span>
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
    variants: {
        type: {
            playback: {
                fontSize: "$200",
                lineHeight: 1.5,

                "& a": {
                    fontSize: "$50",
                },
            },
            cell: {
                paddingRight: "$400",
            },
        },
    },

    color: "$white800",
    display: "flex",
    flexFlow: "column",
    fontSize: "$350",
    fontWeight: "500",

    "& a": {
        color: "$white500",
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

export default TrackInformation;
