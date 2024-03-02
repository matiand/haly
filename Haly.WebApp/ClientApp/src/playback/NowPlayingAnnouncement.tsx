import { createPortal } from "react-dom";

import { StreamedTrackDto } from "../common/atoms/playbackAtoms";
import VisuallyHidden from "../ui/VisuallyHidden";

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

export default NowPlayingAnnouncement;
