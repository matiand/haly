import { MenuDivider } from "@szhsin/react-menu";

import { PlaylistBriefDto, PlaylistWithTracksDto } from "../../../generated/haly";
import { HeartMutationParams } from "../../common/useHeartMutations";
import AddToPlaylistMenuItem from "../../menus/items/AddToPlaylistMenuItem";
import EditPlaylistDetailsMenuItem from "../../menus/items/EditPlaylistDetailsMenuItem";
import ForcePlaylistSyncMenuItem from "../../menus/items/ForcePlaylistSyncMenuItem";
import HeartMenuItem from "../../menus/items/HeartMenuItem";
import ShareMenuItems from "../../menus/items/ShareMenuItems";

type PlaylistMenuItemsProps = {
    playlist: PlaylistBriefDto | PlaylistWithTracksDto;
    isInLibrary: boolean;
    isOwnedByCurrentUser: boolean;
    isLikedSongsCollection?: boolean;
};

function PlaylistMenuItems({
    playlist,
    isInLibrary,
    isOwnedByCurrentUser,
    isLikedSongsCollection,
}: PlaylistMenuItemsProps) {
    if (isLikedSongsCollection) {
        return (
            <>
                <ForcePlaylistSyncMenuItem id={playlist.id} isLikedSongsCollection />
            </>
        );
    }

    const heartMutationParams: HeartMutationParams = {
        id: playlist.id,
        type: "playlist",
    };
    const playlistUri = `spotify:playlist:${playlist.id}`;

    return (
        <>
            <ForcePlaylistSyncMenuItem id={playlist.id} />
            <MenuDivider />

            {/*// We don't allow adding whole playlists to the queue.*/}
            {/*// Their API doesn't allow clearing the queue, so we want to avoid a situation where the*/}
            {/*// user adds a playlist with a lot of tracks, then after a while decides to listen to*/}
            {/*// another one but he can't cancel the queue in our app, so he needs to use one of the*/}
            {/*// native apps to do it.*/}
            {/*<AddToQueueMenuItem/>*/}

            {isOwnedByCurrentUser && (
                <EditPlaylistDetailsMenuItem
                    id={playlist.id}
                    name={playlist.name}
                    description={playlist.description ?? ""}
                />
            )}
            <HeartMenuItem
                params={heartMutationParams}
                isInLibrary={isInLibrary}
                confirmationModalProps={{
                    id: playlist.id,
                    name: playlist.name,
                    isOwnedByCurrentUser,
                }}
            />
            <AddToPlaylistMenuItem collectionUri={playlistUri} />

            <MenuDivider />
            <ShareMenuItems type="playlist" id={playlist.id} name={playlist.name} path={`/playlist/${playlist.id}`} />
        </>
    );
}

export default PlaylistMenuItems;
