import { GetPlaylistResponse } from "../../generated/haly";
import { styled } from "../common/theme";
import CoverImage from "./CoverImage";

type PlaylistHeaderProps = {
    name: string;
    imageUrl: GetPlaylistResponse["imageUrl"];
    description: GetPlaylistResponse["description"];
    owner: string;
    songsCount: number;
    totalDuration: string;
};

function PlaylistHeader({ name, imageUrl, description, owner, songsCount, totalDuration }: PlaylistHeaderProps) {
    return (
        <Wrapper>
            <CoverImage imageUrl={imageUrl} type="playlist" alt={`${name} cover image`} />
            <PlaylistInfo>
                <Subtitle>Playlist</Subtitle>
                <Title>{name}</Title>
                <Description>{description}</Description>
                <Details>
                    <Owner>{owner}</Owner>
                    <CollectionInfo>
                        {songsCount} songs, {totalDuration}
                    </CollectionInfo>
                </Details>
            </PlaylistInfo>
        </Wrapper>
    );
}

const Wrapper = styled("div", {
    alignItems: "flex-end",
    color: "$white",
    display: "flex",
    height: "24vh",
    maxHeight: "400px",
    minHeight: "272px",
    padding: "0 0 $700",

    "& > img": {
        marginRight: "$700",
    },
});

const PlaylistInfo = styled("div", {
    display: "flex",
    flexFlow: "column",
    justifyContent: "flex-end",
});

const Title = styled("h1", {
    fontSize: "$800",
    lineHeight: "normal",
    marginBottom: "$500",
    // marginTop: "$600",
    overflow: "hidden",
    userSelect: "none",
    wordBreak: "break-all",
    "-webkit-line-clamp": 3,
    "-webkit-box-orient": "vertical",
    display: "-webkit-box",
});

const Subtitle = styled("h2", {
    fontSize: "$100",
    fontWeight: "700",
    textTransform: "uppercase",
});

const Details = styled("div", {
    alignItems: "center",
    display: "flex",
    flexWrap: "wrap",
    fontSize: "$200",
    marginTop: "$400",
});

const Description = styled("p", {
    color: "$grey200",
});

const Owner = styled("span", {
    fontWeight: "700",
    userSelect: "none",
});

const CollectionInfo = styled("span", {
    "&::before": {
        content: "•",
        margin: "0 $200",
    },
});

export default PlaylistHeader;
