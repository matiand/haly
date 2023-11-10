import { useAtomValue } from "jotai/index";

import { PlaylistBriefDto } from "../../generated/haly";
import { userIdAtom } from "../common/atoms";

function useIsPlaylistOwnedByCurrentUser(ownerId: PlaylistBriefDto["ownerId"]) {
    const userId = useAtomValue(userIdAtom);

    return ownerId === userId;
}

export default useIsPlaylistOwnedByCurrentUser;
