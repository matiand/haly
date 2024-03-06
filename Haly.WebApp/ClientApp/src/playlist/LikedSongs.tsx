import { useAtomValue } from "jotai";

import { userAtom } from "../common/atoms/userAtoms";
import Playlist from "../playlist/Playlist";
import { usePlaylistSortOrder } from "./usePlaylistSortOrder";

function LikedSongs() {
    const user = useAtomValue(userAtom);
    const collectionId = user?.likedSongsCollectionId;
    const { sortOrder } = usePlaylistSortOrder(collectionId ?? "", true);

    // This should never happen. We don't start rendering our app until we have a user.
    if (!collectionId) return null;

    return (
        <Playlist
            id={collectionId}
            uri={`spotify:user:${user!.id}:collection`}
            sortOrder={sortOrder}
            isInLibrary
            isLikedSongsCollection
        />
    );
}

export default LikedSongs;
