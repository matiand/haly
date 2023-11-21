import { useAtomValue } from "jotai";

import { PlaylistBriefDto } from "../../generated/haly";
import { userIdAtom } from "../common/atoms/userAtoms";

function useIsPlaylistOwnedByCurrentUser(ownerId: PlaylistBriefDto["ownerId"]) {
    const userId = useAtomValue(userIdAtom);

    return ownerId === userId;
}

export default useIsPlaylistOwnedByCurrentUser;
