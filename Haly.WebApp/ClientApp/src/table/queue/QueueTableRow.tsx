import clsx from "clsx";
import { useAtomValue } from "jotai";

import { TrackDto } from "../../../generated/haly";
import { playbackUriAtom } from "../../common/atoms/playbackAtoms";
import useContextMenu from "../../menus/useContextMenu";
import { useTrackPlayback } from "../../playback/usePlaybackMutations";
import TrackContextMenu from "../menus/TrackContextMenu";
import PlaybackCell from "../PlaybackCell";
import TrackAlbumCell from "../TrackAlbumCell";
import TrackDurationCell from "../TrackDurationCell";
import TrackInformationCell from "../TrackInformationCell";
import { TrackLikedState } from "../useTableRowLikedState";
import { TrackPlaybackState } from "../useTableRowPlaybackState";

type QueueTableRowProps = {
    position: number;
    track: TrackDto;
    playbackState: TrackPlaybackState;
    likedState: TrackLikedState;
    // We used to allow the selection feature, but QueueTable is implemented in such a way that it
    // breaks often (e.g. selecting first track of each section, shift select).
    // isSelected: boolean;
    // selectTrack: (e: React.MouseEvent<HTMLTableRowElement>) => void;
};

function QueueTableRow({ position, track, playbackState, likedState }: QueueTableRowProps) {
    const playbackUri = useAtomValue(playbackUriAtom);
    const { togglePlayback, updatePlayback } = useTrackPlayback({
        track,
        trackPlaybackState: playbackState,
        contextUriOverride: playbackUri,
    });

    const { onContextMenu, menuProps } = useContextMenu();

    return (
        <tr
            onDoubleClick={updatePlayback}
            onContextMenu={onContextMenu}
            className={clsx({
                isDisabled: !track.isPlayable,
                isListenedTo: playbackState !== "none",
            })}
        >
            <td>
                <PlaybackCell
                    position={position}
                    name={track.name}
                    playbackState={playbackState}
                    playbackAction={togglePlayback}
                />
            </td>
            <td>
                <TrackInformationCell track={track} showExplicitMark={track.isExplicit} showArtists />
            </td>
            <td>
                <TrackAlbumCell track={track} />
            </td>
            <td>
                <TrackDurationCell track={track} likedState={likedState} />
            </td>

            <TrackContextMenu track={track} menuProps={menuProps} />
        </tr>
    );
}

export default QueueTableRow;
