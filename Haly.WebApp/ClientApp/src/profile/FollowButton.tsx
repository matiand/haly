import { styled } from "../common/theme";

function FollowButton() {
    const onClick = () => console.log("Follow");

    return (
        <Button type="button" onClick={onClick}>
            Follow
        </Button>
    );
}

const Button = styled("button", {
    background: "transparent",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    borderRadius: "4px",
    color: "$white800",
    fontSize: "$100",
    fontWeight: "700",
    letterSpacing: "0.1em",
    lineHeight: 1.25,
    padding: "$400 $600",
    textTransform: "uppercase",
    userSelect: "none",

    "&:hover": {
        borderColor: "$white800",
    },
});

export default FollowButton;
