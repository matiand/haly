import { useAtomValue } from "jotai";

import { userAtom } from "../common/atoms";
import Playlist from "../playlist/Playlist";
import { usePlaylistSortOrder } from "./usePlaylistSortOrder";

function LikedSongs() {
    const user = useAtomValue(userAtom);
    const id = user?.likedSongsCollectionId;
    const { sortOrder } = usePlaylistSortOrder(id ?? "", true);

    // This should never happen. We don't start rendering our app until we have a user.
    if (!id) return null;

    return <Playlist id={id} sortOrder={sortOrder} isInLibrary isLikedSongsCollection />;
}

export default LikedSongs;
