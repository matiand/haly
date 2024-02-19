import { AlbumTrackDto, PlaylistTrackDto, TrackDto } from "../../generated/haly";
import * as Block from "../ui/block/Block";
import BlockImage from "../ui/block/BlockImage";
import ExplicitMark from "../ui/block/ExplicitMark";
import TrackSubtitle from "../ui/block/TrackSubtitle";
import TrackTitle from "../ui/block/TrackTitle";

type TrackInformationCellProps = {
    track: TrackDto | PlaylistTrackDto | AlbumTrackDto;
    showExplicitMark?: boolean;
    showArtists?: boolean;
    searchTerm?: string | null;
};

function TrackInformationCell({ track, showExplicitMark, showArtists, searchTerm }: TrackInformationCellProps) {
    const showCoverImage = "album" in track;

    return (
        <Block.Root>
            {showCoverImage && <BlockImage imageUrl={track.album.imageUrl} />}

            <Block.Grid type="default">
                <TrackTitle name={track.name} searchTerm={searchTerm} />
                {showExplicitMark && <ExplicitMark />}
                {showArtists && <TrackSubtitle artists={track.artists} searchTerm={searchTerm} />}
            </Block.Grid>
        </Block.Root>
    );
}

export default TrackInformationCell;
