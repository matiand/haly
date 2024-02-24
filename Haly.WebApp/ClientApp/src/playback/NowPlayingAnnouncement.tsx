import { createPortal } from "react-dom";

import { StreamedTrackDto } from "../common/atoms/playbackAtoms";
import { styled } from "../common/theme";

type NowPlayingAnnouncement = {
    title: string;
    artists: StreamedTrackDto["artists"];
};

function NowPlayingAnnouncement({ title, artists }: NowPlayingAnnouncement) {
    const featuredArtists = artists.map((a) => a.name).join(", ");
    const text = `Now playing: ${title} by ${featuredArtists}`;

    return createPortal(
        <VisuallyHidden role="status" aria-live="polite">
            {text}
        </VisuallyHidden>,
        document.body,
    );
}

const VisuallyHidden = styled("span", {
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: "1px",
    overflow: "hidden",
    position: "absolute",
    whiteSpace: "nowrap",
    width: "1px",
});

export default NowPlayingAnnouncement;
