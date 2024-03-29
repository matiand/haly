import { LuMic2 } from "react-icons/lu";

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
            <a target="_blank" href={href} rel="noreferrer" title="Open GENIUS lyrics">
                <span aria-hidden>
                    <LuMic2 />
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
            height: "22px",
            width: "20px",
        },
    },
});

export default LyricsAnchor;
