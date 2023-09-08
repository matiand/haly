import { ArtistDetailedDto, TrackDto } from "../../generated/haly";
import { styled } from "../common/theme";
import TopTracksTable from "../table/toptracks/TopTracksTable";
import MiniCard from "../ui/card/MiniCards";

type ArtistHighlightsProps = {
    tracks: TrackDto[];
    playlist?: ArtistDetailedDto["highlightedPlaylist"];
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
