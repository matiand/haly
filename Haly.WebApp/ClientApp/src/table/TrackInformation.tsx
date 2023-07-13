import { Link } from "react-router-dom";

import { AlbumTrackDto, PlaylistTrackDto } from "../../generated/haly";
import { styled } from "../common/theme";
import TrackCoverImage from "../common/TrackCoverImage";

type TrackInformationProps = {
    track: PlaylistTrackDto | AlbumTrackDto;
    type: "cell" | "playback";
};

function TrackInformation({ track, type }: TrackInformationProps) {
    const { name, artists, isExplicit } = track;

    const isPlaylistTrack = "type" in track;
    const showExplicitMark = isExplicit && type === "cell";
    const showArtists = !isPlaylistTrack || track.type === "Song";
    const shouldLinkToAlbum = isPlaylistTrack && type === "playback";

    return (
        <Wrapper>
            {isPlaylistTrack && <TrackCoverImage type={type} imageUrl={track.album.imageUrl} />}

            <Grid type={type}>
                <Title className="line-clamp-ellipsis">
                    {shouldLinkToAlbum ? <Link to={`/album/${track.album.id}`}>{name}</Link> : name}
                </Title>

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

const Title = styled("div", {
    gridArea: "title",
});

const Subtitle = styled("span", {
    alignSelf: "baseline",
    gridArea: "subtitle",

    "& > a": {
        color: "$white500",
        fontSize: "$200",
        textDecoration: "none",

        "&:hover": {
            color: "$white800",
            textDecoration: "underline",
        },

        "&:not(:last-child):after": {
            content: ", ",
            width: "0.6em",
        },
    },
});

const Grid = styled("div", {
    variants: {
        type: {
            playback: {
                lineHeight:1.25,
                
                [`& ${Subtitle} > a`]: {
                    fontSize: "$50",
                },

                [`& ${Title} > a`]: {
                    color: "inherit",
                    fontSize: "$200",
                    letterSpacing: "-0.005em",
                    textDecoration: "none",

                    "&:hover": {
                        textDecoration: "underline"
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
    userSelect: "none",
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

export default TrackInformation;
