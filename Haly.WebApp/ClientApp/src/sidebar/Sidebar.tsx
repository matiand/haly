import { styled, theme } from "../common/theme";
import NavigationList from "./NavigationList";
import Resizer from "./Resizer";
import useResize from "./useResize";
import UserLibrary from "./UserLibrary";

function Sidebar() {
    const { defaultWidth, minWidth, maxWidth } = theme.sidebar;
    const { width, enableResize } = useResize({
        initialWidth: defaultWidth,
        minWidth,
        maxWidth,
    });

    return (
        <Nav id="sidebar" style={{ width }} onMouseDown={enableResize}>
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
