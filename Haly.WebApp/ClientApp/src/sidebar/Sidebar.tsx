import { styled, theme } from "../common/theme";
import NavigationList from "./NavigationList";
import Resizer from "./Resizer";
import useSidebarResize from "./useResize";
import UserLibrary from "./UserLibrary";

const { minWidth, maxWidth } = theme.sidebar;

function Sidebar() {
    const { width, enableResize } = useSidebarResize({
        minWidth,
        maxWidth,
    });

    return (
        <Nav style={{ width }} onPointerDown={enableResize}>
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
