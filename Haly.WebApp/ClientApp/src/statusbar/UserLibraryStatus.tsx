import { useAtom } from "jotai";

import { playlistIdsWithOldTracksAtom } from "../common/atoms";
import { styled } from "../common/theme";

function UserLibraryStatus() {
    const [playlistWithOldTracks] = useAtom(playlistIdsWithOldTracksAtom);

    if (playlistWithOldTracks.length > 0) {
        return <Status>Syncing... ({playlistWithOldTracks.length})</Status>;
    }

    return <Status>Library synced</Status>;
}

const Status = styled("div", {});

export default UserLibraryStatus;
