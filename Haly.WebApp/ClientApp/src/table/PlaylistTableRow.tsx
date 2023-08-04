import { useAtomValue } from "jotai";

import { PlaylistTrackDto } from "../../generated/haly";
import { playlistSearchTerm } from "../common/atoms";
import { styled } from "../common/theme";
import TrackAlbumCell from "./TrackAlbumCell";
import TrackDateAddedCell from "./TrackDateAddedCell";
import TrackDurationCell from "./TrackDurationCell";
import TrackIndexCell from "./TrackIndexCell";
import TrackInformation from "./TrackInformation";

type PlaylistTableRowProps = {
    index: number;
    track: PlaylistTrackDto;
    start?: number;
};

function PlaylistTableRow({ index, track, start }: PlaylistTableRowProps) {
    const searchTerm = useAtomValue(playlistSearchTerm);

    return (
        <TableRow style={{ transform: `translateY(${start}px` }} data-playable={track.isPlayable}>
            <td>
                <TrackIndexCell index={index} track={track} />
            </td>

            <td>
                <TrackInformation
                    track={track}
                    type="cell"
                    hideArtists={track.type === "Podcast"}
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
                <TrackDurationCell track={track} />
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
