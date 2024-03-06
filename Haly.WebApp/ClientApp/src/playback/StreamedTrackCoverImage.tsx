import { useAtomValue } from "jotai";
import React, { useState } from "react";
import { createPortal } from "react-dom";

import { AlbumBriefDto } from "../../generated/haly";
import { persistedSidebarWidthAtom } from "../common/atoms/pageAtoms";
import { streamedTrackAtom, StreamedTrackDto } from "../common/atoms/playbackAtoms";
import ExpandableImageWithLink from "../ui/ExpandableImageWithLink";

type StreamedTrackCoverImageProps = {
    imageUrl: AlbumBriefDto["imageUrl"];
    trackName: string;
    artistName: string;
    onContextMenu: (e: React.MouseEvent) => void;
};

function StreamedTrackCoverImage({ imageUrl, trackName, artistName, onContextMenu }: StreamedTrackCoverImageProps) {
    const streamedTrack = useAtomValue(streamedTrackAtom);
    const [isExpanded, setIsExpanded] = useState(false);
    const sidebarWidth = useAtomValue(persistedSidebarWidthAtom);
    const scrollToHref = getScrollToHref(streamedTrack);

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
                        scrollToHref={scrollToHref}
                        isExpanded
                        toggle={toggle}
                        size={sidebarWidth}
                        linkLabel={linkLabel}
                        chevronLabel={chevronLabel}
                        onContextMenu={onContextMenu}
                    />,
                    document.body,
                )
            ) : (
                <ExpandableImageWithLink
                    imageUrl={imageUrl}
                    scrollToHref={scrollToHref}
                    isExpanded={false}
                    toggle={toggle}
                    size={60}
                    linkLabel={linkLabel}
                    chevronLabel={chevronLabel}
                    onContextMenu={onContextMenu}
                />
            )}
        </>
    );
}

function getScrollToHref(streamedTrack: StreamedTrackDto | null) {
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

export default StreamedTrackCoverImage;
