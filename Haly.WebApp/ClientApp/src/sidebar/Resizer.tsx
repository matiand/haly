import { styled } from "../common/theme";

const Resizer = styled("div", {
    width: "9px",
    cursor: "col-resize",
    opacity: 0,
    position: "absolute",
    top: "-1px",
    right: 0,
    bottom: 0,
    zIndex: 100,
});

export default Resizer;
