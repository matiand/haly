import { useQuery } from "@tanstack/react-query";

import { IsCurrentUserFollowingAlbum } from "../common/queryKeys";
import halyClient from "../halyClient";
import HeartButton from "../ui/HeartButton";

type AlbumHeartButtonProps = {
    albumId: string;
};

function AlbumHeartButton({ albumId }: AlbumHeartButtonProps) {
    const query = useQuery(IsCurrentUserFollowingAlbum(albumId), () =>
        halyClient.following.checkIfCurrentUserFollowsAnAlbum({ albumId }),
    );

    if (!query.data) return null;

    // The halyClient runtime returns a string, not a boolean.
    const isOn = (query.data as unknown as string) === "true";

    return (
        <HeartButton
            params={{
                id: albumId,
                type: "album",
            }}
            isOn={isOn}
        />
    );
}

export default AlbumHeartButton;
