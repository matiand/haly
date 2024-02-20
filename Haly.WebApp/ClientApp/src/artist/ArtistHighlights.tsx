import { useState } from "react";

import { ArtistDetailedDto, TrackDto } from "../../generated/haly";
import { styled } from "../common/theme";
import BasicTable from "../table/basic/BasicTable";
import MiniCard from "../ui/card/MiniCard";

type ArtistHighlightsProps = {
    artistId: string;
    tracks: TrackDto[];
    playlist?: ArtistDetailedDto["highlightedPlaylist"];
};

function ArtistHighlights({ tracks, playlist }: ArtistHighlightsProps) {
    const [showMore, setShowMore] = useState(false);

    const showButton = tracks.length > 5;
    const btnLabel = showMore ? "Show less" : "See more";

    return (
        <Wrapper>
            <div>
                <h2>Popular</h2>
                <div>
                    <BasicTable items={tracks.slice(0, showMore ? 10 : 5)} />
                    {showButton && (
                        <Button type="button" onClick={() => setShowMore((prev) => !prev)}>
                            {btnLabel}
                        </Button>
                    )}
                </div>
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

const Button = styled("button", {
    background: "transparent",
    border: "none",
    color: "$white500",
    fontSize: "$200",
    fontWeight: 700,
    padding: "$600",

    "&:hover": {
        color: "$white800",
    },
});

export default ArtistHighlights;
