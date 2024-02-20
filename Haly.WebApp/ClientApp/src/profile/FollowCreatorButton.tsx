import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";

import { CreatorType } from "../../generated/haly";
import { styled } from "../common/theme";
import halyClient from "../halyClient";
import Button from "../ui/Button";

type FollowButtonProps = {
    creatorId: string;
    initialValue: boolean;
    type: CreatorType;
};

function FollowCreatorButton({ creatorId, initialValue, type }: FollowButtonProps) {
    const [isFollowing, setIsFollowing] = useState(initialValue);

    const follow = useMutation(
        (creatorId: string) =>
            halyClient.meFollowing.followCreator({
                id: creatorId,
                type,
            }),
        { onSuccess: () => toast("Added to Your Library.") },
    );
    const unfollow = useMutation(
        (creatorId: string) =>
            halyClient.meFollowing.followCreator({
                id: creatorId,
                type,
            }),
        { onSuccess: () => toast("Removed from Your Library.") },
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
        <FollowingButton variant="square" type="button" onClick={onClick} data-is-following={isFollowing}>
            {isFollowing ? "Following" : "Follow"}
        </FollowingButton>
    );
}

const FollowingButton = styled(Button, {
    "&[data-is-following=true]": {
        borderColor: "$white800",
    },
});

export default FollowCreatorButton;
