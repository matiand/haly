import { useQuery } from "@tanstack/react-query";

import { IsCurrentUserFollowingAlbum } from "../common/queryKeys";
import { styled } from "../common/theme";
import halyClient from "../halyClient";
import HeartButton from "../ui/HeartButton";

type AlbumHeartButtonProps = {
    albumId: string;
};

function AlbumHeartButton({ albumId }: AlbumHeartButtonProps) {
    const query = useQuery(IsCurrentUserFollowingAlbum(albumId), () =>
        halyClient.following.checkIfCurrentUserFollowsAnAlbum({ albumId }),
    );

    if (!query.data) return <EmptySpace />;

    // The halyClient runtime returns a string, not a boolean.
    const isOn = (query.data as unknown as string) === "true";

    return (
        <HeartButton
            params={{
                id: albumId,
                type: "album",
            }}
            initialState={isOn}
        />
    );
}

const EmptySpace = styled("div", {
    height: "32px",
    width: "32px",
});

export default AlbumHeartButton;
