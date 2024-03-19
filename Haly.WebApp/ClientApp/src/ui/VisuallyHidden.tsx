import { styled } from "../common/theme";

const VisuallyHidden = styled("span", {
    border: 0,
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: "1px",
    margin: "-1px",
    padding: 0,
    overflow: "hidden",
    position: "absolute",
    whiteSpace: "nowrap",
    width: "1px",
});

export default VisuallyHidden;
