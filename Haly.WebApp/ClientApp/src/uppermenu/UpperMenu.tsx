import { useAtomValue, useSetAtom } from "jotai";

import { pageContextAtom, pageDominantColorAtom } from "../common/atoms/pageAtoms";
import { selectedTracksAtom } from "../common/atoms/trackAtoms";
import { styled } from "../common/theme";
import UpperMenuBackground from "./UpperMenuBackground";
import UpperMenuControls from "./UpperMenuControls";
import useDynamicBackground from "./useDynamicBackground";
import UserDropdownMenu from "./UserDropdownMenu";

function UpperMenu() {
    const pageContext = useAtomValue(pageContextAtom);
    const color = useAtomValue(pageDominantColorAtom);

    const setSelectedTracks = useSetAtom(selectedTracksAtom);

    const { opacity, showDetails } = useDynamicBackground();

    if (!pageContext) {
        return (
            <Header aria-label="User menu">
                <UserDropdownMenu />
            </Header>
        );
    }

    const { id: contextId, name } = pageContext.data;

    return (
        <Header aria-label="User menu" onClick={() => setSelectedTracks([])}>
            <UpperMenuBackground color={color} opacity={opacity} />

            <ContextDetails
                css={
                    showDetails
                        ? {
                              opacity: 1,
                              visibility: "visible",
                              pointerEvents: "all",
                          }
                        : {}
                }
            >
                {contextId && <UpperMenuControls contextId={contextId} />}
                <span className="line-clamp-ellipsis">{name}</span>
            </ContextDetails>

            <UserDropdownMenu />
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
