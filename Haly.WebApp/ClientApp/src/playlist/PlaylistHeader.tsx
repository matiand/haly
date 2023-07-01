import { Link } from "react-router-dom";

import { PlaylistMetadataDto } from "../../generated/haly";
import { styled } from "../common/theme";
import CollectionImage from "./CollectionImage";
import PlaylistTitle from "./PlaylistTitle";

type PlaylistHeaderProps = {
    id: string;
    name: string;
    imageUrl: PlaylistMetadataDto["imageUrl"];
    description: PlaylistMetadataDto["description"];
    likesTotal: PlaylistMetadataDto["likesTotal"];
    owner: PlaylistMetadataDto["owner"];
    songsCount: number;
    totalDuration: string;
};

function PlaylistHeader({
    id,
    name,
    imageUrl,
    description,
    likesTotal,
    owner,
    songsCount,
    totalDuration,
}: PlaylistHeaderProps) {
    return (
        <Wrapper>
            <CollectionImage playlistId={id} imageUrl={imageUrl} alt={`${name} playlist image`} />
            <PlaylistInfo>
                <Subtitle>Playlist</Subtitle>
                <PlaylistTitle name={name} />
                {description && <Description>{description}</Description>}
                <Details>
                    <span>
                        <Link to={`/user/${owner.id}`}>{owner.name}</Link>
                    </span>
                    {likesTotal > 0 && <span>{formatLikes(likesTotal)}</span>}
                    <span>{songsCount} songs,</span>
                    <span>{totalDuration}</span>
                </Details>
            </PlaylistInfo>
        </Wrapper>
    );
}

function formatLikes(likes: number) {
    const amount = likes.toLocaleString();

    return likes > 1 ? `${amount} likes` : `${amount} like`;
}

const Wrapper = styled("div", {
    alignItems: "flex-end",
    color: "$white800",
    display: "flex",
    maxHeight: "400px",
    minHeight: "272px",
    padding: "0 0 $700",
    position: "relative",
    userSelect: "none",

    "& > img": {
        marginRight: "$700",
    },
});

const PlaylistInfo = styled("div", {
    display: "flex",
    flexFlow: "column",
    justifyContent: "flex-end",
});

const Subtitle = styled("h2", {
    fontSize: "$200",
    fontWeight: 700,
});

const Description = styled("p", {
    color: "$collectionTextFaded",
    fontSize: "$200",
    fontWeight: 500,
});

const Details = styled("div", {
    alignItems: "center",
    display: "flex",
    flexWrap: "wrap",
    fontSize: "$200",
    fontWeight: 500,
    marginTop: "$400",

    "& > span:first-of-type": {
        fontWeight: 700,
        a: {
            color: "inherit",
            textDecoration: "none",

            "&:hover": {
                textDecoration: "underline",
            },
        },
    },

    "& > span:not(:first-child):not(:last-child)::before": {
        content: "•",
        fontWeight: 400,
        margin: "0 $200",
    },

    "& > span:last-child": {
        color: "$collectionTextFaded",
        marginLeft: "$200",
    },
});

export default PlaylistHeader;
