import { ArtistTopTrackDto, HighlightedPlaylistDto } from "../../generated/haly";
import Card from "../common/Card";
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
                    <h2>Highlighted Playlist</h2>
                    <Card
                        id={playlist.id}
                        name={playlist.name}
                        href={`/playlist/${playlist.id}`}
                        imageUrl={playlist.imageUrl}
                        isPlayable={false}
                        hasRoundedImage
                    />
                </div>
            )}
        </Wrapper>
    );
}

const Wrapper = styled("div", {
    display: "grid",
    gridTemplateColumns: "1fr",

    "& h2": {
        fontSize: "$500",
        fontWeight: 800,
        paddingBottom: "$400",
    },

    "@bp2": {
        gridTemplateColumns: "2fr 1fr",
    },
});

export default ArtistHighlights;
