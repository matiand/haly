import { AlbumTrackDto } from "../../generated/haly";
import TrackDurationCell from "./TrackDurationCell";
import TrackIndexCell from "./TrackIndexCell";
import TrackInformation from "./TrackInformation";

type AlbumTableRowProps = {
    index: number;
    track: AlbumTrackDto;
};

function AlbumTableRow({ index, track }: AlbumTableRowProps) {
    return (
        <tr data-playable={track.isPlayable}>
            <td>
                <TrackIndexCell index={index} track={track} />
            </td>

            <td>
                <TrackInformation track={track} type="cell" />
            </td>

            <td>
                <TrackDurationCell track={track} />
            </td>
        </tr>
    );
}

export default AlbumTableRow;
