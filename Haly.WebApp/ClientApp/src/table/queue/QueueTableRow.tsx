import clsx from "clsx";
import { useAtomValue } from "jotai";

import { TrackDto } from "../../../generated/haly";
import { playbackContextUriAtom } from "../../common/atoms/playbackAtoms";
import useContextMenu from "../../menus/useContextMenu";
import { useTrackPlaybackActions } from "../../playback/usePlaybackActions";
import TrackContextMenu from "../menus/TrackContextMenu";
import TrackAlbumCell from "../TrackAlbumCell";
import TrackDurationCell from "../TrackDurationCell";
import TrackIndexCell from "../TrackIndexCell";
import TrackInformation from "../TrackInformation";
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
    const contextUri = useAtomValue(playbackContextUriAtom);
    const { togglePlayback, updatePlayback } = useTrackPlaybackActions(playbackState, track, contextUri);
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
                <TrackIndexCell
                    position={position}
                    track={track}
                    playbackState={playbackState}
                    playbackAction={togglePlayback}
                />
            </td>
            <td>
                <TrackInformation track={track} type="cell" showExplicitMark={track.isExplicit} />
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
