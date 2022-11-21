import { TrackDto } from "../../generated/haly";

type TrackTitleCellProps = {
    track: TrackDto;
};

function TrackTitleCell({ track }: TrackTitleCellProps) {
    const artistLine = track.artists.map((artist) => artist.name).join(", ");

    return (
        <div>
            <div>{track.name}</div>
            {track.type === "Song" && <span>{artistLine}</span>}
        </div>
    );
}

export default TrackTitleCell;
