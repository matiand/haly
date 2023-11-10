import { PlaylistWithTracksDto } from "../../../generated/haly";
import ButtonMenu from "../../menus/ButtonMenu";
import useIsPlaylistInLibrary from "../useIsPlaylistInLibrary";
import useIsPlaylistOwnedByCurrentUser from "../useIsPlaylistOwnedByCurrentUser";
import PlaylistMenuItems from "./PlaylistMenuItems";

type PlaylistButtonMenuProps = {
    playlist: PlaylistWithTracksDto;
    isLikedSongsCollection: boolean;
};

function PlaylistButtonMenu({ playlist, isLikedSongsCollection }: PlaylistButtonMenuProps) {
    const isInLibrary = useIsPlaylistInLibrary(playlist.id);
    const isOwnedByCurrentUser = useIsPlaylistOwnedByCurrentUser(playlist.owner.id);

    const btnLabel = isLikedSongsCollection
        ? "More options for 'Liked Songs' collection"
        : `More options for playlist ${playlist.name}`;

    return (
        <ButtonMenu label={btnLabel}>
            <PlaylistMenuItems
                playlist={playlist}
                isInLibrary={isInLibrary}
                isOwnedByCurrentUser={isOwnedByCurrentUser}
                isLikedSongsCollection={isLikedSongsCollection}
            />
        </ButtonMenu>
    );
}

export default PlaylistButtonMenu;
