import { styled } from "../common/theme";

const VisuallyHidden = styled("span", {
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: "1px",
    overflow: "hidden",
    position: "absolute",
    whiteSpace: "nowrap",
    width: "1px",
});

export default VisuallyHidden;
