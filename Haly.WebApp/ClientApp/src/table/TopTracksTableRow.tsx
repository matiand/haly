import { ArtistTopTrackDto } from "../../generated/haly";
import TrackDurationCell from "./TrackDurationCell";
import TrackIndexCell from "./TrackIndexCell";
import TrackInformation from "./TrackInformation";

type TrackRowProps = {
    index: number;
    track: ArtistTopTrackDto;
};

function TopTracksTableRow({ index, track }: TrackRowProps) {
    return (
        <tr data-playable={track.isPlayable}>
            <td>
                <TrackIndexCell index={index} track={track} />
            </td>

            <td>
                <TrackInformation track={track} type="cell" hideArtists />
            </td>

            <td>
                <TrackDurationCell track={track} />
            </td>
        </tr>
    );
}

export default TopTracksTableRow;
