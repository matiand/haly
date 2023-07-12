import { Link } from "react-router-dom";

import { PlaylistTrackDto } from "../../generated/haly";
import { styled } from "../common/theme";
import TrackCoverImage from "../common/TrackCoverImage";

type TrackInformationProps = {
    track: PlaylistTrackDto;
    type: "cell" | "playback";
};

function TrackInformation({ track, type }: TrackInformationProps) {
    const { name, type: trackType, album, artists, isExplicit } = track;

    const showExplicitMark = isExplicit && type === "cell";

    return (
        <Wrapper>
            <TrackCoverImage type={type} imageUrl={album.imageUrl} />
            <TrackContents type={type}>
                <div className="line-clamp-ellipsis">{name}</div>

                {trackType === "Song" && (
                    <Artists>
                        {showExplicitMark && (
                            <span aria-label="Explicit" title="Explicit">
                                E
                            </span>
                        )}
                        <span className="line-clamp-ellipsis">
                            {artists.map(({ name, id }) => (
                                <Link key={id} to={`/artist/${id}`}>
                                    {name}
                                </Link>
                            ))}
                        </span>
                    </Artists>
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

const Artists = styled("div", {
    alignItems: "center",
    display: "flex",
    gap: "8px",

    "& > span[aria-label=Explicit]": {
        background: "$explicitMarkBg",
        borderRadius: "2px",
        color: "$black600",
        fontSize: "8px",
        lineHeight: 1,
        padding: "$200",
    },

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
});

export default TrackInformation;
