import { SiGenius } from "react-icons/si";

import { StreamedTrackDto } from "../common/atoms/playbackAtoms";
import { styled } from "../common/theme";
import useLyricsQuery from "./useLyricsQuery";

type LyricsLinkProps = {
    track: StreamedTrackDto;
};

function LyricsAnchor({ track }: LyricsLinkProps) {
    const query = useLyricsQuery(track);

    const href = query.data?.geniusUrl;
    if (!href) return null;

    return (
        <Wrapper>
            <a target="_blank" href={href} rel="noreferrer">
                <span aria-hidden>
                    <SiGenius />
                </span>
            </a>
        </Wrapper>
    );
}

const Wrapper = styled("div", {
    display: "flex",

    a: {
        alignItems: "center",
        color: "$white400",
        cursor: "default",
        display: "flex",
        justifyContent: "center",
        padding: "0 $400",

        "&:hover": {
            color: "$white800",
        },

        "& span, & svg": {
            height: "18px",
            width: "18px",
        },
    },
});

export default LyricsAnchor;
