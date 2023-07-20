import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

import { CreatorType } from "../../generated/haly";
import { styled } from "../common/theme";
import halyClient from "../halyClient";

type FollowButtonProps = {
    creatorId: string;
    initialValue: boolean;
    type: CreatorType;
};

function FollowButton({ creatorId, initialValue, type }: FollowButtonProps) {
    const [isFollowing, setIsFollowing] = useState(initialValue);
    const follow = useMutation((creatorId: string) =>
        halyClient.following.follow({
            type,
            creatorId,
        }),
    );
    const unfollow = useMutation((creatorId: string) =>
        halyClient.following.unfollow({
            type,
            creatorId,
        }),
    );

    const onClick = () => {
        if (isFollowing) {
            setIsFollowing(false);
            unfollow.mutate(creatorId);
        } else {
            setIsFollowing(true);
            follow.mutate(creatorId);
        }
    };

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
