import { ArtistDetailedDto, TrackDto } from "../../generated/haly";
import { styled } from "../common/theme";
import TopTracksTable from "../table/toptracks/TopTracksTable";
import MiniCard from "../ui/card/MiniCard";

type ArtistHighlightsProps = {
    artistId: string;
    tracks: TrackDto[];
    playlist?: ArtistDetailedDto["highlightedPlaylist"];
};

function ArtistHighlights({ artistId, tracks, playlist }: ArtistHighlightsProps) {
    return (
        <Wrapper>
            <div>
                <h2>Popular</h2>
                <TopTracksTable artistId={artistId} items={tracks} />
            </div>

            {playlist && (
                <div>
                    <h2>Playlist Pick</h2>
                    <MiniCard
                        id={playlist.id}
                        name={playlist.name}
                        uri={`spotify:playlist:${playlist.id}`}
                        href={`/playlist/${playlist.id}`}
                        subtitle={`By ${playlist.owner.name}`}
                        imageUrl={playlist.imageUrl}
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
