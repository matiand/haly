import { HiPlay } from "react-icons/hi2";
import { MdPodcasts } from "react-icons/md";

import { AlbumTrackDto, PlaylistTrackDto, TrackDto } from "../../generated/haly";
import { styled } from "../common/theme";

type TrackIndexCellProps = {
    index: number;
    track: TrackDto | PlaylistTrackDto | AlbumTrackDto;
};

function TrackIndexCell({ index, track }: TrackIndexCellProps) {
    const label = `Play ${track.name}`;
    const isPodcast = "type" in track && track.type === "Podcast";

    return (
        <Wrapper>
            <Index>{index}</Index>
            {isPodcast ? (
                <PlayBtn
                    type="button"
                    aria-label="Streaming podcasts is not supported"
                    title="Streaming podcasts is not supported"
                    aria-disabled
                >
                    <span>
                        <MdPodcasts />
                    </span>
                </PlayBtn>
            ) : (
                <PlayBtn type="button" aria-label={label} title={label}>
                    <span>
                        <HiPlay />
                    </span>
                </PlayBtn>
            )}
        </Wrapper>
    );
}

const Wrapper = styled("div", {
    alignItems: "center",
    color: "$white500",
    display: "flex",
    fontSize: "$300",
    fontWeight: 500,
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

    "& svg": {
        height: "16px",
        width: "16px",
    },
});

export default TrackIndexCell;
