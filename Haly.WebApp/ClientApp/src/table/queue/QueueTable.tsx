import { useAtomValue } from "jotai";

import { TrackDto } from "../../../generated/haly";
import { streamedTrackAtom } from "../../common/atoms/playbackAtoms";
import { styled } from "../../common/theme";
import * as Table from "../Table";
import useTableRowLikedState from "../useTableRowLikedState";
import { TrackPlaybackState } from "../useTableRowPlaybackState";
import QueueTableRow from "./QueueTableRow";

type QueueTableProps = {
    tracks: TrackDto[];
    positionOffset: number;
};

function QueueTable({ tracks, positionOffset }: QueueTableProps) {
    const getTableRowLikedState = useTableRowLikedState();
    const streamedTrack = useAtomValue(streamedTrackAtom);
    const isTrackPaused = streamedTrack?.isPaused;

    let playbackState: TrackPlaybackState = "none";
    // Only modify playbackState if it's the track from 'Now playing' section.
    if (positionOffset === 1 && isTrackPaused) {
        playbackState = "paused";
    } else if (positionOffset === 1) {
        playbackState = "playing";
    }

    return (
        <div>
            <TableRoot>
                <Table.Body>
                    {tracks.map((track, idx) => (
                        <QueueTableRow
                            key={idx}
                            position={positionOffset + idx}
                            track={track}
                            playbackState={playbackState}
                            likedState={getTableRowLikedState(track.id, track.playbackId)}
                        />
                    ))}
                </Table.Body>
            </TableRoot>
        </div>
    );
}

const TableRoot = styled(Table.Root, {
    "& > tbody": {
        tr: {
            gridGap: "$700",
            gridTemplateColumns: "16px 4fr 2fr minmax(120px, 1fr)",
        },
    },

    "& td:nth-of-type(3)": {
        justifySelf: "start",
    },

    "&& td:nth-of-type(4)": {
        justifySelf: "end",
    },
});

export default QueueTable;
