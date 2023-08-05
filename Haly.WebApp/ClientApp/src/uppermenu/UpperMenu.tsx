import { useAtomValue } from "jotai";

import { dominantColorsAtom, pageContextAtom } from "../common/atoms";
import { styled } from "../common/theme";
import PlaybackToggle from "../playback/PlaybackToggle";
import useDynamicBackground from "./useDynamicBackground";
import UserDropdown from "./UserDropdown";

function UpperMenu() {
    const pageContext = useAtomValue(pageContextAtom);
    const dominantColors = useAtomValue(dominantColorsAtom);
    const { opacity, showDetails } = useDynamicBackground();

    if (!pageContext) {
        return (
            <Header aria-label="User menu">
                <UserDropdown />
            </Header>
        );
    }

    const color = dominantColors[pageContext.imageUrl ?? ""];

    return (
        <Header aria-label="User menu">
            <Background css={{ $$color: color, opacity }}>
                <div />
            </Background>

            <ContextDetails css={showDetails ? { opacity: 1, visibility: "visible", pointerEvents: "all" } : {}}>
                {pageContext.onPlayback && <PlaybackToggle size="medium" />}
                <span className="line-clamp-ellipsis">{pageContext.title}</span>
            </ContextDetails>

            <UserDropdown />
        </Header>
    );
}

const Header = styled("header", {
    alignItems: "center",
    display: "flex",
    justifyContent: "space-between",
    gridArea: "main",
    height: "$upperMenuHeight",
    padding: "$600 $700",
    position: "relative",
    pointerEvents: "all",

    "& > :not(div:first-child)": {
        zIndex: "$upperMenuContents",
    },
});

const Background = styled("div", {
    background: "$$color",
    borderRadius: "8px 8px 0 0",
    height: "100%",
    position: "absolute",
    left: 0,
    right: 0,
    zIndex: "$upperMenuBackground",

    "& > div": {
        background: "$upperMenuMask",
        height: "100%",
    },
});

const ContextDetails = styled("div", {
    alignItems: "center",
    display: "flex",
    gap: "$600",
    opacity: 0,
    pointerEvents: "none",
    transition: "opacity .5s, visibility .5s",
    visibility: "hidden",

    "& > button": {
        flexShrink: 0,
    },

    "& > span": {
        fontSize: "$500",
        fontWeight: 800,
        letterSpacing: "-0.004em",
        userSelect: "none",
    },
});

export default UpperMenu;
