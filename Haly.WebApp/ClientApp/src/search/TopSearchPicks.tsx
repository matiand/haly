import { ArtistCardDto, PlaylistCardDto, ReleaseItemDto, TrackDto } from "../../generated/haly";
import { styled } from "../common/theme";
import BasicTable from "../table/basic/BasicTable";
import TopResultBlock from "./TopResultBlock";

type TopSearchPicksProps = {
    artist?: ArtistCardDto;
    album?: ReleaseItemDto;
    playlist?: PlaylistCardDto;
    songs: TrackDto[];
};

function TopSearchPicks({ artist, album, playlist, songs }: TopSearchPicksProps) {
    return (
        <Wrapper>
            <div>
                <h2>Top results</h2>
                <Blocks>
                    {artist && <TopResultBlock card={artist} uri={`spotify:artist:${artist.id}`} />}

                    {album && <TopResultBlock card={album} uri={`spotify:album:${album.id}`} />}

                    {playlist && <TopResultBlock card={playlist} uri={`spotify:playlist:${playlist.id}`} />}
                </Blocks>
            </div>

            <div>
                <h2>Songs</h2>
                <BasicTable items={songs} showArtists />
            </div>
        </Wrapper>
    );
}

const Wrapper = styled("section", {
    display: "grid",
    gap: "$600",
    gridTemplateColumns: "1fr",
    padding: "0 0 $600",

    "& h2": {
        fontSize: "$500",
        marginBlockEnd: "$400",
        userSelect: "none",
    },

    "@bp2": {
        gridTemplateColumns: "1fr 2fr",
    },
});

const Blocks = styled("div", {
    display: "flex",
    flexFlow: "column",
    gap: "$600",

    span: {
        color: "$white500",
    },
});

export default TopSearchPicks;
