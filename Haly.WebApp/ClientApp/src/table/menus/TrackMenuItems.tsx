import { MenuDivider } from "@szhsin/react-menu";

import { AlbumTrackDto, PlaylistTrackDto, TrackDto } from "../../../generated/haly";
import { HeartMutationParams } from "../../common/useHeartMutations";
import AddToPlaylistMenuItem from "../../menus/items/AddToPlaylistMenuItem";
import AddToQueueMenuItem from "../../menus/items/AddToQueueMenuItem";
import GoToMenuItem from "../../menus/items/GoToMenuItem";
import HeartMenuItem from "../../menus/items/HeartMenuItem";
import RemoveFromPlaylistMenuItem from "../../menus/items/RemoveFromPlaylistMenuItem";
import ShareMenuItems from "../../menus/items/ShareMenuItems";
import { TrackLikedState } from "../useTableRowLikedState";

type TrackMenuItemsProps = {
    tracks: (TrackDto | PlaylistTrackDto | AlbumTrackDto)[];
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
    const trackUris = tracks.map((t) => t.uri!);

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
                {!disallowAddToQueue && <AddToQueueMenuItem trackUris={trackUris} />}
                <HeartMenuItem key={track.id} params={heartParams} isInLibrary={likedStates[0].isLiked} />
                <AddToPlaylistMenuItem trackUris={trackUris} />

                {playlistId && (
                    <RemoveFromPlaylistMenuItem
                        params={{
                            playlistId,
                            tracks: [
                                {
                                    uri: track.uri!,
                                    positions: [(track as PlaylistTrackDto).positionInPlaylist],
                                },
                            ],
                        }}
                    />
                )}

                <MenuDivider />
                {!disallowGoToArtist && <GoToMenuItem artists={track.artists} />}
                {"album" in track && <GoToMenuItem album={track.album} />}
                <MenuDivider />

                <ShareMenuItems type="song" id={track.id!} name={track.name} path={`/track/${track.id}`} />
            </>
        );
    }

    const uris = tracks.map((t) => t.uri).filter((uri): uri is string => Boolean(uri));
    const heartParams: HeartMutationParams = {
        type: "track",
        ids: likedStates.map((l, idx) => ({
            likedId: l.likedId!,
            playbackId: tracks[idx].playbackId!,
        })),
    };

    return (
        <>
            <AddToQueueMenuItem trackUris={uris} />
            <HeartMenuItem params={heartParams} isInLibrary={likedStates.some((s) => s.isLiked)} />

            {playlistId && (
                <RemoveFromPlaylistMenuItem
                    params={{
                        playlistId,
                        tracks: (tracks as PlaylistTrackDto[]).map((t) => ({
                            uri: t.uri!,
                            positions: [t.positionInPlaylist],
                        })),
                    }}
                />
            )}

            <AddToPlaylistMenuItem trackUris={uris} />
        </>
    );
}

export default TrackMenuItems;
