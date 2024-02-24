import { MenuDivider } from "@szhsin/react-menu";

import { AlbumTrackDto, PlaylistTrackDto, RemoveTracksRequest, TrackDto } from "../../../generated/haly";
import { StreamedTrackWithIdDto } from "../../common/atoms/playbackAtoms";
import { HeartMutationParams } from "../../common/useHeartMutations";
import AddToPlaylistMenuItem from "../../menus/items/AddToPlaylistMenuItem";
import AddToQueueMenuItem from "../../menus/items/AddToQueueMenuItem";
import GoToMenuItem from "../../menus/items/GoToMenuItem";
import HeartMenuItem from "../../menus/items/HeartMenuItem";
import MoveToPlaylistMenuItem from "../../menus/items/MoveToPlaylistMenuItem";
import RemoveFromPlaylistMenuItem from "../../menus/items/RemoveFromPlaylistMenuItem";
import ShareMenuItems from "../../menus/items/ShareMenuItems";
import { TrackLikedState } from "../useTableRowLikedState";

type TrackMenuItemsProps = {
    tracks: (TrackDto | PlaylistTrackDto | AlbumTrackDto | StreamedTrackWithIdDto)[];
    likedStates: TrackLikedState[];

    // Id of playlist that owns these tracks. Used for move/remove actions. Playlist needs to be
    // editable by current user, otherwise these actions are not allowed.
    playlistIdForRemovals?: string;
    disallowAddToQueue?: boolean;
    disallowGoToArtist?: boolean;
};

function TrackMenuItems({
    tracks,
    likedStates,
    playlistIdForRemovals,
    disallowAddToQueue,
    disallowGoToArtist,
}: TrackMenuItemsProps) {
    const trackUris = tracks.map((t) => t.uri).filter((uri): uri is string => Boolean(uri));
    const tracksWithPosition: RemoveTracksRequest["tracks"] = tracks.map((t) => ({
        uri: t.uri!,
        position: "positionInPlaylist" in t ? t.positionInPlaylist : -1,
    }));

    if (tracks.length === 1) {
        const track = tracks[0];

        const heartParams: HeartMutationParams = {
            type: "track",
            ids: [
                {
                    likedId: likedStates[0].likedId!,
                    playbackId: track.playbackId!,
                },
            ],
        };

        return (
            <>
                {playlistIdForRemovals && (
                    <>
                        <MoveToPlaylistMenuItem fromPlaylistId={playlistIdForRemovals} tracks={tracksWithPosition} />
                        <MenuDivider />
                    </>
                )}

                <AddToPlaylistMenuItem trackUris={trackUris} />
                {playlistIdForRemovals && (
                    <RemoveFromPlaylistMenuItem
                        params={{
                            playlistId: playlistIdForRemovals,
                            tracks: tracksWithPosition,
                        }}
                    />
                )}
                <HeartMenuItem key={track.id} params={heartParams} isInLibrary={likedStates[0].isLiked} />
                {!disallowAddToQueue && <AddToQueueMenuItem trackUris={trackUris} />}

                <MenuDivider />
                {!disallowGoToArtist && <GoToMenuItem artists={track.artists} />}
                {"album" in track && <GoToMenuItem album={track.album} />}
                <MenuDivider />

                <ShareMenuItems type="song" id={track.id!} name={track.name} path={`/track/${track.id}`} />
            </>
        );
    }

    const heartParams: HeartMutationParams = {
        type: "track",
        ids: likedStates.map((l, idx) => ({
            likedId: l.likedId!,
            playbackId: tracks[idx].playbackId!,
        })),
    };

    return (
        <>
            {playlistIdForRemovals && (
                <>
                    <MoveToPlaylistMenuItem fromPlaylistId={playlistIdForRemovals} tracks={tracksWithPosition} />
                    <MenuDivider />
                </>
            )}

            {!disallowAddToQueue && <AddToQueueMenuItem trackUris={trackUris} />}
            <HeartMenuItem params={heartParams} isInLibrary={likedStates.every((s) => s.isLiked)} />

            {playlistIdForRemovals && (
                <RemoveFromPlaylistMenuItem
                    params={{
                        playlistId: playlistIdForRemovals,
                        tracks: tracksWithPosition,
                    }}
                />
            )}

            <AddToPlaylistMenuItem trackUris={trackUris} />
        </>
    );
}

export default TrackMenuItems;
