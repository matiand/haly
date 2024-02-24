import { styled } from "../common/theme";

export const mainContentId = "main-content";

function SkipToMainContent() {
    return <Anchor href={`#${mainContentId}`}>Skip to main content</Anchor>;
}

const Anchor = styled("a", {
    background: "$white800",
    borderRadius: "4px",
    color: "$secondary700",
    fontWeight: 500,
    margin: "$400",
    padding: "$400 $600",
    position: "absolute",
    transform: "translate(-9999px, -9999px)",

    "&:focus": {
        transform: "translate(50%, 0)",
        zIndex: 9999,
    },
});

export default SkipToMainContent;
