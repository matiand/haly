import { styled } from "../common/theme";

type PlaylistHeaderProps = {
    name: string;
    // todo: use playlistDto in the future when this is finished
    imageUrl: string | null | undefined;
    owner: string;
    songsCount: number;
    totalDuration: string;
};

function PlaylistHeader({ name, imageUrl, owner, songsCount, totalDuration }: PlaylistHeaderProps) {
    return (
        <Wrapper>
            {imageUrl && <Image />}
            <PlaylistInfo>
                <Subtitle>Playlist</Subtitle>
                <Title>{name}</Title>
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
    height: "22.5vh",
    maxHeight: "375px",
    minHeight: "255px",
    padding: "0 $800 $700 $800",
});

const Image = styled("div", {
    background: "#fff",
    height: "192px",
    marginRight: "$700",
    width: "192px",
});

const PlaylistInfo = styled("div", {
    display: "flex",
    flexFlow: "column",
    height: "192px",
    justifyContent: "flex-end",
});

const Title = styled("h1", {
    fontSize: "$800",
    lineHeight: "normal",
    marginBottom: "$500",
    marginTop: "$600",
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
    marginTop: "$200",
    textTransform: "uppercase",
});
const Details = styled("div", {
    alignItems: "center",
    display: "flex",
    flexWrap: "wrap",
    marginTop: "$400",
});

const Owner = styled("span", {
    fontSize: "$300",
    fontWeight: "700",
    userSelect: "none",
});

const CollectionInfo = styled("span", {
    "&::before": {
        content: "•",
        margin: "0 $200",
    },

    fontSize: "$300",
});

export default PlaylistHeader;
