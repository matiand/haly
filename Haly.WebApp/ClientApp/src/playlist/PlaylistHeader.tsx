import { useAtomValue } from "jotai";
import { useCallback, useDeferredValue } from "react";
import { useWindowSize } from "usehooks-ts";

import { PlaylistWithTracksDto } from "../../generated/haly";
import { dominantColorsAtom } from "../common/atoms";
import { styled, theme } from "../common/theme";
import CollectionCoverImage from "./CollectionCoverImage";

type PlaylistHeaderProps = {
    id: string;
    name: string;
    imageUrl: PlaylistWithTracksDto["metadata"]["imageUrl"];
    description: PlaylistWithTracksDto["metadata"]["description"];
    owner: string;
    songsCount: number;
    totalDuration: string;
};

const titleSizeSteps = [96, 72, 48, 32];

function PlaylistHeader({ id, name, imageUrl, description, owner, songsCount, totalDuration }: PlaylistHeaderProps) {
    console.log("PlaylistHeader", name);
    const dominantColors = useAtomValue(dominantColorsAtom);
    const { width: windowWidth } = useWindowSize();
    const width = useDeferredValue(windowWidth);

    const dominantColor = dominantColors[id] ?? theme.colors.defaultDominantColor;
    console.log("Dominant color", dominantColor);

    // todo: refactor into hook
    const titleRef = useCallback(
        (node: HTMLHeadingElement) => {
            if (!node) return;

            const height = node.getBoundingClientRect().height;
            console.log("PlaylistHeader", height);

            node.style.setProperty("visibility", "hidden");

            for (let i = 0; i < titleSizeSteps.length; i++) {
                const baseVal = titleSizeSteps[i];
                const val = (baseVal + baseVal * 0.08 + baseVal * 0.12) * 1.5;

                node.style.setProperty("font-size", `${baseVal}px`);

                const newHeight = node.getBoundingClientRect().height;

                if (val >= newHeight) break;
            }

            node.style.setProperty("visibility", "visible");
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [name, width],
    );

    return (
        <Wrapper>
            {imageUrl && <CollectionCoverImage playlistId={id} imageUrl={imageUrl} alt={`${name} playlist image`} />}
            <PlaylistInfo>
                <Subtitle>Playlist</Subtitle>
                <Title ref={titleRef}>{name}</Title>
                {description && <Description>{description}</Description>}
                <Details>
                    <Owner>{owner}</Owner>
                    <CollectionInfo>
                        {songsCount} songs, {totalDuration}
                    </CollectionInfo>
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

// todo: make it an asset, so that the base64 is automatically generated
// todo: they don't use zIndex for major + color
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
        background: `linear-gradient(transparent 0%, rgba(0,0,0,.5) 100%), url(${gradientNoise}), $$dominantColor`,
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
        background: `linear-gradient(rgba(0,0,0,.6) 0%, $black600 100%), url(${gradientNoise}), $$dominantColor`,
    },
});

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

const Title = styled("h1", {
    fontSize: "$700",
    fontWeight: "800",
    letterSpacing: "-0.03em",
    lineHeight: 1.15,
    margin: "0.08em 0px 0.12em",
    overflow: "hidden",
    userSelect: "none",
    wordBreak: "break-word",
    "-webkit-line-clamp": 3,
    "-webkit-box-orient": "vertical",
    display: "-webkit-box",
});

const Subtitle = styled("h2", {
    fontSize: "$300",
    fontWeight: "700",
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
    fontSize: "$200",
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
