import { useAtomValue, useSetAtom } from "jotai";

import { pageContextAtom, pageDominantColorAtom } from "../common/atoms/pageAtoms";
import { selectedTracksAtom } from "../common/atoms/trackAtoms";
import { styled } from "../common/theme";
import UpperMenuBackground from "./UpperMenuBackground";
import UpperMenuControls from "./UpperMenuControls";
import UpperMenuTitle from "./UpperMenuTitle";
import useDynamicUpperMenuContent from "./useDynamicUpperMenuContent";
import UserDropdownMenu from "./UserDropdownMenu";

function UpperMenu() {
    const pageContext = useAtomValue(pageContextAtom);
    const color = useAtomValue(pageDominantColorAtom);

    const setSelectedTracks = useSetAtom(selectedTracksAtom);

    const { opacity, isContentVisible } = useDynamicUpperMenuContent();

    if (!pageContext) {
        return (
            <Header aria-label="User menu">
                <UserDropdownMenu />
            </Header>
        );
    }

    const { id: contextId, name } = pageContext.data;
    const hasControls = pageContext.type !== "user" && pageContext.type !== "basic";

    return (
        <Header aria-label="User menu" onClick={() => setSelectedTracks([])}>
            <UpperMenuBackground color={color} opacity={opacity} />

            <Content
                css={
                    isContentVisible
                        ? {
                              opacity: 1,
                              visibility: "visible",
                              pointerEvents: "all",
                          }
                        : {}
                }
            >
                {hasControls && <UpperMenuControls contextId={contextId} />}
                <UpperMenuTitle name={name} contextId={contextId} contextType={pageContext.type} />
            </Content>

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

const Content = styled("div", {
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
});

export default UpperMenu;
