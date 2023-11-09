import { useAtomValue } from "jotai";

import { PlaylistWithTracksDto } from "../../../generated/haly";
import { userIdAtom } from "../../common/atoms";
import ButtonMenu from "../../menus/ButtonMenu";
import useIsPlaylistInLibrary from "../useIsPlaylistInLibrary";
import PlaylistMenuItems from "./PlaylistMenuItems";

type PlaylistButtonMenuProps = {
    playlist: PlaylistWithTracksDto;
};

function PlaylistButtonMenu({ playlist }: PlaylistButtonMenuProps) {
    const userId = useAtomValue(userIdAtom);
    const isInLibrary = useIsPlaylistInLibrary(playlist.id);

    const isOwnedByCurrentUser = playlist.owner.id === userId;

    return (
        <ButtonMenu label={`More options for playlist ${playlist.name}`}>
            <PlaylistMenuItems
                playlist={playlist}
                isInLibrary={isInLibrary}
                isOwnedByCurrentUser={isOwnedByCurrentUser}
            />
        </ButtonMenu>
    );
}

export default PlaylistButtonMenu;
