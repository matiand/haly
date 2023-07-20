import { styled } from "../common/theme";

type FollowButtonProps = {
    onClick: () => void;
    isFollowing: boolean;
};

function FollowButton({ onClick, isFollowing }: FollowButtonProps) {
    return (
        <Button type="button" onClick={onClick} data-is-following={isFollowing}>
            {isFollowing ? "Following" : "Follow"}
        </Button>
    );
}

const Button = styled("button", {
    $$borderColor: "rgba(255, 255, 255, 0.3)",

    background: "transparent",
    border: "1px solid $$borderColor",
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
        cursor: "pointer",
    },

    "&[data-is-following=true]": {
        borderColor: "$white800",
    },
});

export default FollowButton;
