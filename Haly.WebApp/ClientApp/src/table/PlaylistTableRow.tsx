import { PlaylistTrackDto } from "../../generated/haly";
import TrackAlbumCell from "./TrackAlbumCell";
import TrackDateAddedCell from "./TrackDateAddedCell";
import TrackDurationCell from "./TrackDurationCell";
import TrackIndexCell from "./TrackIndexCell";
import TrackInformation from "./TrackInformation";

type PlaylistTableRowProps = {
    index: number;
    track: PlaylistTrackDto;
};

function PlaylistTableRow({ index, track }: PlaylistTableRowProps) {
    return (
        <tr data-playable={track.isPlayable}>
            <td>
                <TrackIndexCell index={index} track={track} />
            </td>

            <td>
                <TrackInformation track={track} type="cell" />
            </td>

            <td>
                <TrackAlbumCell track={track} />
            </td>

            <td>
                <TrackDateAddedCell track={track} />
            </td>

            <td>
                <TrackDurationCell track={track} />
            </td>
        </tr>
    );
}

export default PlaylistTableRow;
