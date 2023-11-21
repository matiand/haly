import { useAtom } from "jotai";
import { useEffect } from "react";

import { persistedSidebarWidthAtom } from "../common/atoms/pageAtoms";
import { styled, theme } from "../common/theme";
import NavigationList from "./NavigationList";
import Resizer from "./Resizer";
import useResize from "./useResize";
import UserLibrary from "./UserLibrary";

const { minWidth, maxWidth } = theme.sidebar;

function Sidebar() {
    const [sidebarWidth, setSidebarWidth] = useAtom(persistedSidebarWidthAtom);

    const { width, enableResize } = useResize({
        initialWidth: sidebarWidth,
        minWidth,
        maxWidth,
    });

    useEffect(() => {
        setSidebarWidth(width);
    }, [width, setSidebarWidth]);

    return (
        <Nav style={{ width }} onMouseDown={enableResize}>
            <NavigationList />
            <UserLibrary />

            <Resizer />
        </Nav>
    );
}

const Nav = styled("nav", {
    display: "flex",
    flexFlow: "column",
    gap: "$400",
    height: "100%",
    minHeight: 0,
    position: "relative",
    userSelect: "none",

    "& > *": {
        background: "$black600",
        borderRadius: "8px",
    },
});

export default Sidebar;
