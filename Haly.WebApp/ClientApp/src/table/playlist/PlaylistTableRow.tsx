import clsx from "clsx";
import { useAtomValue } from "jotai";

import { PlaylistTrackDto } from "../../../generated/haly";
import { playlistSearchTermAtom } from "../../common/atoms";
import { styled } from "../../common/theme";
import { PlaybackContextState } from "../../common/usePlaybackContextState";
import TrackAlbumCell from "../TrackAlbumCell";
import TrackDateAddedCell from "../TrackDateAddedCell";
import TrackDurationCell from "../TrackDurationCell";
import TrackIndexCell from "../TrackIndexCell";
import TrackInformation from "../TrackInformation";
import useScrollToTrack from "../useScrollToTrack";
import useSelectingTrack from "../useSelectingTrack";

type PlaylistTableRowProps = {
    index: number;
    track: PlaylistTrackDto;
    playbackState: PlaybackContextState;
    isLiked: boolean;
    start?: number;
    shouldScrollTo?: boolean;
};

function PlaylistTableRow({
    index,
    track,
    playbackState,
    isLiked,
    start,
    shouldScrollTo = false,
}: PlaylistTableRowProps) {
    const searchTerm = useAtomValue(playlistSearchTermAtom);
    const { isSelected, selectTrack } = useSelectingTrack(index);
    const ref = useScrollToTrack();

    const isLocal = !track.spotifyId;

    return (
        <TableRow
            onClick={selectTrack}
            ref={shouldScrollTo ? ref : null}
            style={{ transform: `translateY(${start}px` }}
            className={clsx({
                disabled: !track.isPlayable,
                isSelected,
            })}
        >
            <td>
                <TrackIndexCell index={index} track={track} noPlayBtn={isLocal} playbackState={playbackState} />
            </td>

            <td>
                <TrackInformation
                    track={track}
                    type="cell"
                    isListenedTo={playbackState !== "none"}
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
                <TrackDurationCell track={track} noActions={isLocal} isLiked={isLiked} />
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
