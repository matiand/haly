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
    const showArtists = trackType === "Song";

    return (
        <Wrapper>
            <TrackCoverImage type={type} imageUrl={album.imageUrl} />
            <Grid type={type}>
                <Title className="line-clamp-ellipsis">{name}</Title>

                {showExplicitMark && (
                    <Explicit aria-label="Explicit" title="Explicit">
                        E
                    </Explicit>
                )}

                {showArtists && (
                    <Subtitle className="line-clamp-ellipsis">
                        {artists.map(({ name, id }) => (
                            <Link key={id} to={`/artist/${id}`}>
                                {name}
                            </Link>
                        ))}
                    </Subtitle>
                )}
            </Grid>
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

const Grid = styled("div", {
    variants: {
        type: {
            playback: {
                fontSize: "$200",
                letterSpacing: "-0.005em",
                userSelect: "none",

                "& a": {
                    fontSize: "$50",

                    "&:hover": {
                        color: "$white800",
                    },
                },
            },
            cell: {
                height: "calc($collectionRowHeight * 0.9)",
                paddingRight: "$400",
            },
        },
    },

    alignItems: "center",
    color: "$white800",
    display: "grid",
    gridTemplateAreas: `"title title"
                        "explicit subtitle"`,
    gridTemplateColumns: "auto 1fr",
    fontSize: "$350",
    fontWeight: "500",
});

const Title = styled("div", {
    gridArea: "title",
});

const Explicit = styled("span", {
    background: "$explicitMarkBg",
    borderRadius: "2px",
    color: "$black600",
    fontSize: "8px",
    gridArea: "explicit",
    lineHeight: 1,
    marginRight: "$400",
    padding: "$200",
});

const Subtitle = styled("span", {
    alignSelf: "baseline",
    gridArea: "subtitle",

    "& > a": {
        color: "$white500",
        display: "inline-block",
        fontSize: "$200",
        textDecoration: "none",

        "&:hover": {
            textDecoration: "underline",
        },

        "&:not(:last-child):after": {
            content: ", ",
            display: "inline-block",
            width: "0.6em",
        },
    },
});

export default TrackInformation;
