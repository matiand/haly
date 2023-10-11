import clsx from "clsx";
import { useAtomValue } from "jotai";

import { PlaylistTrackDto } from "../../../generated/haly";
import { playlistSearchTermAtom } from "../../common/atoms";
import { styled } from "../../common/theme";
import { useTrackPlaybackActions } from "../../common/useStreamingActions";
import { TrackLikedState } from "../../common/useTableRowLikedState";
import TrackAlbumCell from "../TrackAlbumCell";
import TrackDateAddedCell from "../TrackDateAddedCell";
import TrackDurationCell from "../TrackDurationCell";
import TrackIndexCell from "../TrackIndexCell";
import TrackInformation from "../TrackInformation";
import useTrackSelection from "../useSelectingTrack";
import { TrackPlaybackState } from "../useTableRowPlaybackState";

type PlaylistTableRowProps = {
    index: number;
    track: PlaylistTrackDto;
    playbackState: TrackPlaybackState;
    likedState: TrackLikedState;
    start?: number;
};

function PlaylistTableRow({ index, track, playbackState, likedState, start }: PlaylistTableRowProps) {
    const searchTerm = useAtomValue(playlistSearchTermAtom);
    const { isSelected, selectTrack } = useTrackSelection(index);
    const { togglePlayback, updatePlayback } = useTrackPlaybackActions(playbackState, track);

    const isListenedTo = playbackState !== "none";
    const isLocal = !track.id;

    return (
        <TableRow
            onClick={selectTrack}
            onDoubleClick={updatePlayback}
            style={{ transform: `translateY(${start}px` }}
            className={clsx({
                disabled: !track.isPlayable,
                isSelected,
            })}
        >
            <td>
                <TrackIndexCell
                    index={index}
                    track={track}
                    playbackState={playbackState}
                    playbackAction={togglePlayback}
                />
            </td>

            <td>
                <TrackInformation
                    track={track}
                    type="cell"
                    isListenedTo={isListenedTo}
                    showExplicitMark={track.isExplicit}
                    hideArtists={isLocal || !track.isSong}
                    searchTerm={searchTerm}
                />
            </td>

            <td>
                <TrackAlbumCell track={track} searchTerm={searchTerm} />
            </td>

            <td>
                <TrackDateAddedCell track={track} />
            </td>

            <td>
                <TrackDurationCell track={track} noActions={isLocal || !track.isSong} likedState={likedState} />
            </td>
        </TableRow>
    );
}

const TableRow = styled("tr", {
    "&&&": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
    },
});

export default PlaylistTableRow;
