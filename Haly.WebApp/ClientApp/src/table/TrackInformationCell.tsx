import { AlbumTrackDto, PlaylistTrackDto, TrackDto } from "../../generated/haly";
import * as Track from "../ui/track/Track";
import TrackCoverImage from "../ui/track/TrackCoverImage";
import TrackSubtitle from "../ui/track/TrackSubtitle";
import TrackTitle from "../ui/track/TrackTitle";

type TrackInformationCellProps = {
    track: TrackDto | PlaylistTrackDto | AlbumTrackDto;
    showExplicitMark?: boolean;
    showArtists?: boolean;
    searchTerm?: string | null;
};

function TrackInformationCell({ track, showExplicitMark, showArtists, searchTerm }: TrackInformationCellProps) {
    const showCoverImage = "album" in track;

    return (
        <Track.Root>
            {showCoverImage && <TrackCoverImage imageUrl={track.album.imageUrl} />}

            <Track.Grid type="cell">
                <TrackTitle name={track.name} searchTerm={searchTerm} />
                {showExplicitMark && <Track.ExplicitMark />}
                {showArtists && <TrackSubtitle artists={track.artists} searchTerm={searchTerm} />}
            </Track.Grid>
        </Track.Root>
    );
}

export default TrackInformationCell;
