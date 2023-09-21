import { useAtomValue } from "jotai";

import { userAtom } from "../common/atoms";
import Playlist from "../playlist/Playlist";

function LikedSongs() {
    const user = useAtomValue(userAtom);

    // This should never happen. We don't start rendering our app until we have a user.
    if (!user) return null;

    const id = user.likedSongsCollectionId;

    return <Playlist id={id} sortOrder="added_at_desc" isInLibrary isLikedSongsCollection />;
}

export default LikedSongs;
