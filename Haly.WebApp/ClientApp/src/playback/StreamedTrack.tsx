import { useAtomValue } from "jotai";

import { TrackDto } from "../../generated/haly";
import { StreamedTrackDto } from "../common/atoms/playbackAtoms";
import { cachedPlaylistsAtom } from "../common/atoms/playlistAtoms";
import { userIdAtom } from "../common/atoms/userAtoms";
import useDraggable from "../dnd/useDraggable";
import useContextMenu from "../menus/useContextMenu";
import { TrackLikedState } from "../table/useTableRowLikedState";
import * as Track from "../ui/track/Track";
import TrackSubtitle from "../ui/track/TrackSubtitle";
import TrackTitle from "../ui/track/TrackTitle";
import StreamedTrackContextMenu from "./StreamedTrackContextMenu";
import StreamedTrackCoverImage from "./StreamedTrackCoverImage";

type StreamedTrackProps = {
    track: StreamedTrackDto;
    likedState: TrackLikedState;
    foundTrackId?: TrackDto["id"];
};

function StreamedTrack({ track, likedState, foundTrackId }: StreamedTrackProps) {
    const { onContextMenu, menuProps } = useContextMenu();

    const cachedPlaylists = useAtomValue(cachedPlaylistsAtom);
    const playlist = cachedPlaylists.find((p) => p.id === track.context?.id);

    // We treat a track as movable if their id was found in our cache and their context is owned by the user.
    // Without the id, operations like removing a track from a playlist won't do anything. This is
    // only a problem for streamed tracks, because they lack the id.
    const userId = useAtomValue(userIdAtom);
    const isTrackMovable = Boolean(foundTrackId && playlist?.ownerId === userId);

    const { draggableRef, ...draggableProps } = useDraggable({
        id: `streamed-track:${foundTrackId ?? track.playbackId}`,
        data: {
            id: foundTrackId ?? track.playbackId,
            type: "streamed-track",
            title: [track.name, track.artists[0].name],
            moveParams: isTrackMovable
                ? {
                      fromPlaylistId: track.context!.id,
                  }
                : undefined,
        },
    });

    const albumHref = `/album/${track.album.id}`;

    return (
        <>
            <Track.Root ref={draggableRef} {...draggableProps}>
                <StreamedTrackCoverImage
                    imageUrl={track.album.imageUrl}
                    trackName={track.name}
                    artistName={track.artists[0].name}
                    onContextMenu={onContextMenu}
                />

                <Track.Grid type="playback">
                    <TrackTitle name={track.name} href={albumHref} onContextMenu={onContextMenu} />
                    <TrackSubtitle artists={track.artists} />
                </Track.Grid>
            </Track.Root>

            <StreamedTrackContextMenu
                track={track}
                // If no id was found, we fallback to the playbackId. It's safe to do, because of
                // the 'isTrackMovable' prop.
                trackId={foundTrackId ?? track.playbackId}
                menuProps={menuProps}
                likedState={likedState}
                isTrackMovable={isTrackMovable}
            />
        </>
    );
}

export default StreamedTrack;
