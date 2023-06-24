import { useAtomValue } from "jotai";

import { PlaylistWithTracksDto } from "../../generated/haly";
import { dominantColorsAtom } from "../common/atoms";
import { styled, theme } from "../common/theme";
import CollectionCoverImage from "./CollectionCoverImage";
import PlaylistTitle from "./PlaylistTitle";

type PlaylistHeaderProps = {
    id: string;
    name: string;
    imageUrl: PlaylistWithTracksDto["metadata"]["imageUrl"];
    description: PlaylistWithTracksDto["metadata"]["description"];
    likesTotal: PlaylistWithTracksDto["metadata"]["likesTotal"];
    owner: string;
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
    const dominantColors = useAtomValue(dominantColorsAtom);

    const dominantColor = dominantColors[id] ?? theme.colors.defaultDominantColor;
    console.log("Dominant color", dominantColor);
    return (
        <Wrapper>
            {imageUrl && <CollectionCoverImage playlistId={id} imageUrl={imageUrl} alt={`${name} playlist image`} />}
            <PlaylistInfo>
                <Subtitle>Playlist</Subtitle>
                <PlaylistTitle name={name} />
                {description && <Description>{description}</Description>}
                <Details>
                    <span>{owner}</span>
                    {likesTotal > 0 && <span>{formatLikes(likesTotal)}</span>}
                    <span>{songsCount} songs,</span>
                    <span>{totalDuration}</span>
                </Details>
            </PlaylistInfo>

            {dominantColor && (
                <>
                    <GradientColor css={{ $$dominantColor: dominantColor }} />
                    <GradientMaskMinor css={{ $$dominantColor: dominantColor }} />
                </>
            )}
        </Wrapper>
    );
}

const gradientNoise =
    "data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGZpbHRlciBpZD0iYSIgeD0iMCIgeT0iMCI+PGZlVHVyYnVsZW5jZSBiYXNlRnJlcXVlbmN5PSIuNzc3IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIiB0eXBlPSJmcmFjdGFsTm9pc2UiLz48ZmVDb2xvck1hdHJpeCB0eXBlPSJzYXR1cmF0ZSIgdmFsdWVzPSIwIi8+PC9maWx0ZXI+PHBhdGggZD0iTTAgMGgzMDB2MzAwSDB6IiBmaWx0ZXI9InVybCgjYSkiIG9wYWNpdHk9Ii4wNSIvPjwvc3ZnPg==";

const GradientColor = styled("div", {
    display: "block",
    height: "100%",
    left: 0,
    top: 0,
    position: "absolute",
    width: "100%",
    zIndex: -1,

    "&&": {
        background: `linear-gradient(transparent 0%, rgba(0,0,0,.6) 100%), url(${gradientNoise}), $$dominantColor`,
    },
});

const GradientMaskMinor = styled("div", {
    display: "block",
    height: "100%",
    top: 272,
    position: "absolute",
    width: "100%",
    zIndex: -1,

    "&&": {
        background: `linear-gradient(rgba(0,0,0,.7) 0%, $black600 100%), url(${gradientNoise}), $$dominantColor`,
    },
});
function formatLikes(likes: number) {
    const amount = likes.toLocaleString();

    return likes > 1 ? `${amount} likes` : `${amount} like`;
}

const Wrapper = styled("div", {
    alignItems: "flex-end",
    color: "$white",
    display: "flex",
    height: "24vh",
    maxHeight: "400px",
    minHeight: "272px",
    padding: "0 0 $700",
    position: "relative",

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
    color: "rgba(255, 255, 255, 0.8)",
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
        userSelect: "none",
    },

    "& > span:not(:first-child):not(:last-child)::before": {
        content: "•",
        fontWeight: 400,
        margin: "0 $200",
    },

    "& > span:last-child": {
        color: "rgba(255, 255, 255, 0.8)",
        marginLeft: "$200",
    },
});

export default PlaylistHeader;
