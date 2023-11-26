import { MenuDivider } from "@szhsin/react-menu";

import { AlbumTrackDto, PlaylistTrackDto, RemoveTracksRequest, TrackDto } from "../../../generated/haly";
import { StreamedTrack } from "../../common/atoms/playbackAtoms";
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
    tracks: (TrackDto | PlaylistTrackDto | AlbumTrackDto | StreamedTrack)[];
    likedStates: TrackLikedState[];

    playlistId?: string;
    disallowAddToQueue?: boolean;
    disallowGoToArtist?: boolean;
};

function TrackMenuItems({
    tracks,
    likedStates,
    playlistId,
    disallowAddToQueue,
    disallowGoToArtist,
}: TrackMenuItemsProps) {
    const trackUris = tracks.map((t) => t.uri).filter((uri): uri is string => Boolean(uri));
    const tracksWithPosition: RemoveTracksRequest["tracks"] = tracks.map((t) => ({
        uri: t.uri!,
        positions: "positionInPlaylist" in t ? [t.positionInPlaylist] : [],
    }));

    console.log("Menu will use these tracks:");
    console.table(tracks.map((t) => t.name));

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
                {playlistId && (
                    <>
                        <MoveToPlaylistMenuItem fromPlaylistId={playlistId} tracks={tracksWithPosition} />
                        <MenuDivider />
                    </>
                )}

                <AddToPlaylistMenuItem trackUris={trackUris} />
                {playlistId && (
                    <RemoveFromPlaylistMenuItem
                        params={{
                            playlistId,
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
            {playlistId && (
                <>
                    <MoveToPlaylistMenuItem fromPlaylistId={playlistId} tracks={tracksWithPosition} />
                    <MenuDivider />
                </>
            )}

            {!disallowAddToQueue && <AddToQueueMenuItem trackUris={trackUris} />}
            <HeartMenuItem params={heartParams} isInLibrary={likedStates.every((s) => s.isLiked)} />

            {playlistId && (
                <RemoveFromPlaylistMenuItem
                    params={{
                        playlistId,
                        tracks: tracksWithPosition,
                    }}
                />
            )}

            <AddToPlaylistMenuItem trackUris={trackUris} />
        </>
    );
}

export default TrackMenuItems;
