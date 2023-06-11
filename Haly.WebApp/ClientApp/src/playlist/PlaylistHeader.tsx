import { useAtom } from "jotai";
import { useCallback, useDeferredValue, useEffect } from "react";
import { useWindowSize } from "usehooks-ts";

import { PlaylistWithTracksDto } from "../../generated/haly";
import { collectionDominantColorAtom } from "../common/atoms";
import { styled, theme } from "../common/theme";
import CollectionCoverImage from "./CollectionCoverImage";

type PlaylistHeaderProps = {
    name: string;
    imageUrl: PlaylistWithTracksDto["metadata"]["imageUrl"];
    description: PlaylistWithTracksDto["metadata"]["description"];
    owner: string;
    songsCount: number;
    totalDuration: string;
};

const titleSizeSteps = [96, 72, 48, 32];

function PlaylistHeader({ name, imageUrl, description, owner, songsCount, totalDuration }: PlaylistHeaderProps) {
    const [dominantColor, setDominantColor] = useAtom(collectionDominantColorAtom);
    const { width: windowWidth } = useWindowSize();
    const width = useDeferredValue(windowWidth);

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
        [name, width],
    );

    // todo: do I need this
    useEffect(() => {
        if (!imageUrl) {
            setDominantColor(theme.colors.defaultDominantColor);
        } else {
            setDominantColor(null);
        }
    }, [imageUrl, setDominantColor]);

    return (
        <Wrapper>
            {imageUrl && <CollectionCoverImage imageUrl={imageUrl} alt={`${name} playlist image`} />}
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

            {/*{dominantColor && <Gradient css={{ $$dominantColor: dominantColor }} />}*/}
        </Wrapper>
    );
}

const Gradient = styled("div", {
    width: "400px",
    height: "400px",
    zIndex: 1,

    "&&": {
        background: "linear-gradient(to bottom, $$dominantColor, $black600 500px)",
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
