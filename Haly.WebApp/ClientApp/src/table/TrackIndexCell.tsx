import { HiPlay } from "react-icons/hi2";

import { AlbumTrackDto, ArtistTopTrackDto, PlaylistTrackDto } from "../../generated/haly";
import { styled } from "../common/theme";

type TrackIndexCellProps = {
    index: number;
    track: PlaylistTrackDto | AlbumTrackDto | ArtistTopTrackDto;
};

function TrackIndexCell({ index, track }: TrackIndexCellProps) {
    const label = `Play ${track.name}`;

    return (
        <Wrapper>
            <Index>{index}</Index>
            <PlayBtn type="button" aria-label={label} title={label}>
                <span>
                    <HiPlay />
                </span>
            </PlayBtn>
        </Wrapper>
    );
}

const Wrapper = styled("div", {
    alignItems: "center",
    display: "flex",
    height: "16px",
    justifyContent: "flex-end",
    position: "relative",
    width: "16px",
});

const Index = styled("span", {
    fontVariant: "tabular-nums",
    position: "absolute",
    right: ".2em",
});

const PlayBtn = styled("button", {
    background: "transparent",
    border: 0,
    color: "$white800",
    height: "16px",
    padding: 0,
    position: "absolute",
    width: "16px",
});

export default TrackIndexCell;
