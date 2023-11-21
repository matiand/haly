import { useAtomValue } from "jotai";
import { useState } from "react";
import { createPortal } from "react-dom";

import { AlbumBriefDto } from "../../generated/haly";
import { persistedSidebarWidthAtom } from "../common/atoms/pageAtoms";
import { StreamedTrack, streamedTrackAtom } from "../common/atoms/playbackAtoms";
import ExpandableImageWithLink from "../ui/ExpandableImageWithLink";

type PlaybackTrackCoverImageProps = {
    imageUrl: AlbumBriefDto["imageUrl"];
    trackName: string;
    artistName: string;
};

function PlaybackTrackCoverImage({ imageUrl, trackName, artistName }: PlaybackTrackCoverImageProps) {
    const streamedTrack = useAtomValue(streamedTrackAtom);
    const [isExpanded, setIsExpanded] = useState(false);
    const sidebarWidth = useAtomValue(persistedSidebarWidthAtom);
    const contextHref = getScrollToHref(streamedTrack) ?? "#";

    if (!imageUrl) return null;

    const chevronLabel = isExpanded ? "Collapse cover image" : "Expand cover image";
    const linkLabel = `Now playing: ${trackName} by ${artistName}`;
    const toggle = () => setIsExpanded((prev) => !prev);

    return (
        <>
            {isExpanded ? (
                createPortal(
                    <ExpandableImageWithLink
                        imageUrl={imageUrl}
                        linkUrl={contextHref}
                        isExpanded
                        toggle={toggle}
                        size={sidebarWidth}
                        linkLabel={linkLabel}
                        chevronLabel={chevronLabel}
                    />,
                    document.body,
                )
            ) : (
                <ExpandableImageWithLink
                    imageUrl={imageUrl}
                    linkUrl={contextHref}
                    isExpanded={false}
                    toggle={toggle}
                    size={60}
                    linkLabel={linkLabel}
                    chevronLabel={chevronLabel}
                />
            )}
        </>
    );
}

function getScrollToHref(streamedTrack: StreamedTrack | null) {
    if (!streamedTrack || !streamedTrack.context) return null;

    const { type, id } = streamedTrack.context;

    const qs = `scrollToTrackId=${streamedTrack.playbackId}`;
    if (type === "album") {
        return `/album/${id}?${qs}`;
    } else if (type === "playlist") {
        return `/playlist/${id}?${qs}`;
    } else if (type === "artist") {
        return `/artist/${id}`;
    } else {
        return `/collection/tracks?${qs}`;
    }
}

export default PlaybackTrackCoverImage;
