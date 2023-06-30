import { useAtomValue } from "jotai";

import { dominantColorsAtom, pageContextAtom } from "../common/atoms";
import { styled } from "../common/theme";
import PlaybackToggle from "../playback/PlaybackToggle";
import UserDropdown from "./UserDropdown";

function UpperMenu() {
    const pageContext = useAtomValue(pageContextAtom);
    const dominantColors = useAtomValue(dominantColorsAtom);

    console.log("UserMenu context", pageContext);

    if (!pageContext) return null;

    const color = dominantColors[pageContext.metadata.imageUrl ?? ""];

    // put some stuff into separate component?
    return (
        <Header aria-label="User menu">
            <Background css={{ $$color: color }}>
                <div />
            </Background>

            <EntityDetails>
                <PlaybackToggle size="medium" />
                <span className="truncate">{pageContext.name}</span>
            </EntityDetails>
            <UserDropdown />
        </Header>
    );
}

const Header = styled("header", {
    alignItems: "center",
    display: "flex",
    justifyContent: "space-between",
    gridArea: "main",
    height: "$userMenuHeight",
    opacity: 0,
    padding: "$600 $700",
    position: "relative",
    pointerEvents: "none",
    zIndex: "$userMenu",
});

const Background = styled("div", {
    "& > div": {
        background: "$userMenuMask",
        height: "100%",
    },
    background: "$$color",
    borderRadius: "8px 8px 0 0",
    height: "100%",
    position: "absolute",
    left: 0,
    right: 0,
    zIndex: 1,
});

const EntityDetails = styled("div", {
    alignItems: "center",
    display: "flex",
    gap: "$600",

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
