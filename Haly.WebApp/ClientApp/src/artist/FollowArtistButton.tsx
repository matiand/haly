import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

import halyClient from "../halyClient";
import FollowButton from "../profile/FollowButton";

type FollowArtistButtonProps = {
    artistId: string;
    initialIsFollowing: boolean;
};

function FollowArtistButton({ artistId, initialIsFollowing }: FollowArtistButtonProps) {
    const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
    const follow = useMutation((artistId: string) =>
        halyClient.following
            .follow({
                type: "Artist",
                creatorId: artistId,
            })
            .then(() => setIsFollowing(true)),
    );
    const unfollow = useMutation((artistId: string) =>
        halyClient.following
            .unfollow({
                type: "Artist",
                creatorId: artistId,
            })
            .then(() => setIsFollowing(false)),
    );

    const onClick = () => {
        if (isFollowing) {
            setIsFollowing(false);
            unfollow.mutate(artistId!);
        } else {
            setIsFollowing(true);
            follow.mutate(artistId!);
        }
    };

    return <FollowButton isFollowing={isFollowing} onClick={onClick} />;
}

export default FollowArtistButton;
