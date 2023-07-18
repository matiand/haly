import { Link } from "react-router-dom";

import { AlbumTrackDto, ArtistTopTrackDto, PlaylistTrackDto } from "../../generated/haly";
import { styled } from "../common/theme";
import TrackCoverImage from "../common/TrackCoverImage";

type TrackInformationProps = {
    track: PlaylistTrackDto | AlbumTrackDto | ArtistTopTrackDto;
    type: "cell" | "playback";
    hideArtists?: boolean;
};

function TrackInformation({ track, type, hideArtists }: TrackInformationProps) {
    const { name, artists, isExplicit } = track;

    const showExplicitMark = isExplicit && type === "cell";

    const hasAlbum = "album" in track;
    const shouldLinkToAlbum = hasAlbum && type === "playback";

    return (
        <Wrapper>
            {hasAlbum && <TrackCoverImage type={type} imageUrl={track.album.imageUrl} />}

            <Grid type={type}>
                <Title>
                    {shouldLinkToAlbum ? (
                        <Link to={`/album/${track.album.id}`}>
                            <span className="line-clamp-ellipsis">{name}</span>
                        </Link>
                    ) : (
                        <span className="line-clamp-ellipsis">{name}</span>
                    )}
                </Title>

                {showExplicitMark && (
                    <Explicit aria-label="Explicit" title="Explicit">
                        E
                    </Explicit>
                )}

                {!hideArtists && (
                    <Subtitle className="line-clamp-ellipsis">
                        {artists.map(({ name, id }) => (
                            // Disable tabbing on these links, cause the '.line-clamp-ellipsis'
                            // class breaks their focus styles
                            <Link key={id} to={`/artist/${id}`} tabIndex={-1}>
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
    fontSize: "$350",
    gridArea: "title",
});

const Subtitle = styled("span", {
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
        },
    },
});

const Grid = styled("div", {
    variants: {
        type: {
            playback: {
                lineHeight: 1.3,

                [`& ${Subtitle} > a`]: {
                    fontSize: "$50",
                },

                [`& ${Title} > a`]: {
                    color: "inherit",
                    fontSize: "$200",
                    letterSpacing: "-0.005em",
                    textDecoration: "none",

                    "&:hover": {
                        textDecoration: "underline",
                    },
                },
            },
            cell: {
                paddingRight: "$400",
            },
        },
    },

    alignItems: "center",
    color: "$white800",
    display: "grid",
    fontWeight: "500",
    gridTemplateAreas: `"title title"
                        "explicit subtitle"`,
    gridTemplateColumns: "auto 1fr",
    userSelect: "none",
});

const Explicit = styled("span", {
    background: "$explicitMarkBg",
    borderRadius: "2px",
    color: "$black600",
    fontSize: "8px",
    fontWeight: 800,
    gridArea: "explicit",
    lineHeight: 1,
    marginRight: "$400",
    marginTop: "$100",
    padding: "$200",
});

export default TrackInformation;
