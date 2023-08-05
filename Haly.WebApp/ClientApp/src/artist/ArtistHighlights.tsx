import { ArtistTopTrackDto, HighlightedPlaylistDto } from "../../generated/haly";
import MiniCard from "../common/MiniCard";
import { styled } from "../common/theme";
import TopTracksTable from "../table/TopTracksTable";

type ArtistHighlightsProps = {
    tracks: ArtistTopTrackDto[];
    playlist?: HighlightedPlaylistDto;
};

function ArtistHighlights({ tracks, playlist }: ArtistHighlightsProps) {
    return (
        <Wrapper>
            <div>
                <h2>Popular</h2>
                <TopTracksTable items={tracks} />
            </div>

            {playlist && (
                <div>
                    <h2>Playlist Pick</h2>
                    <MiniCard
                        id={playlist.id}
                        name={playlist.name}
                        subtitle={`By ${playlist.ownerName}`}
                        href={`/playlist/${playlist.id}`}
                        imageUrl={playlist.imageUrl}
                        hasRoundedImage={false}
                    />
                </div>
            )}
        </Wrapper>
    );
}

const Wrapper = styled("div", {
    display: "grid",
    gap: "$600",
    gridTemplateColumns: "1fr",
    padding: "0 0 $700",

    "& h2": {
        fontSize: "$500",
        marginBottom: "$500",
        userSelect: "none",
    },

    "@bp2": {
        gridTemplateColumns: "2fr 1fr",
    },
});

export default ArtistHighlights;
