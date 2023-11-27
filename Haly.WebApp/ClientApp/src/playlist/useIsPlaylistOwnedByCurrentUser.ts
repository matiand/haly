import { useAtomValue } from "jotai";

import { cachedPlaylistsAtom } from "../common/atoms/playlistAtoms";
import { userIdAtom } from "../common/atoms/userAtoms";

function useIsPlaylistOwnedByCurrentUser(playlistId: string) {
    const playlists = useAtomValue(cachedPlaylistsAtom);
    const userId = useAtomValue(userIdAtom);

    return playlists.find((p) => p.id === playlistId)?.ownerId === userId;
}

export default useIsPlaylistOwnedByCurrentUser;
