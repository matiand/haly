import { StreamedTrackDto } from "../common/atoms/playbackAtoms";
import useDraggable from "../dnd/useDraggable";
import useContextMenu from "../menus/useContextMenu";
import * as Track from "../ui/track/Track";
import TrackSubtitle from "../ui/track/TrackSubtitle";
import TrackTitle from "../ui/track/TrackTitle";
import StreamedTrackContextMenu from "./StreamedTrackContextMenu";
import StreamedTrackCoverImage from "./StreamedTrackCoverImage";

type StreamedTrackProps = {
    track: StreamedTrackDto;
};

function StreamedTrack({ track }: StreamedTrackProps) {
    // todo: check context to see if this is a move operation

    const { onContextMenu, menuProps } = useContextMenu();

    const { draggableRef, ...draggableProps } = useDraggable({
        id: `streamed-track:${track.id}`,
        data: {
            id: track.id!,
            type: "streamed-track",
            title: [track.name, track.artists[0].name],
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
            <StreamedTrackContextMenu track={track} menuProps={menuProps} />
        </>
    );
}

export default StreamedTrack;
