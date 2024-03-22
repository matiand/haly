import { useQuery } from "@tanstack/react-query";

import { IsCurrentUserFollowingAlbumQueryKey } from "../common/queryKeys";
import halyClient from "../halyClient";

function useIsAlbumInLibrary(albumId: string) {
    const query = useQuery({
        queryKey: IsCurrentUserFollowingAlbumQueryKey(albumId),
        queryFn: () => halyClient.meFollowing.checkIfCurrentUserFollowsAnAlbum({ albumId }),
    });

    // The halyClient runtime returns a string, not a boolean.
    const isOn = (query.data as unknown as string) === "true";

    return {
        isLoading: !query.data,
        isOn,
    };
}

export default useIsAlbumInLibrary;
