import { useAtomValue } from "jotai/index";
import { Link } from "react-router-dom";

import { AlbumBriefDto } from "../../generated/haly";
import { StreamedTrack, streamedTrackAtom } from "../common/atoms";
import { styled } from "../common/theme";

type Props = {
    imageUrl: AlbumBriefDto["imageUrl"];
};

const size = 60;

function PlaybackTrackCoverImage({ imageUrl }: Props) {
    const streamedTrack = useAtomValue(streamedTrackAtom);

    if (!imageUrl) return null;

    const contextHref = getScrollToHref(streamedTrack);

    if (!contextHref) return <Image aria-hidden src={imageUrl} loading="eager" width={size} height={size} />;

    return (
        <WrapperLink to={contextHref}>
            <Image aria-hidden src={imageUrl} loading="eager" width={size} height={size} />
        </WrapperLink>
    );
}

function getScrollToHref(streamedTrack: StreamedTrack | null) {
    if (!streamedTrack || !streamedTrack.context) return null;

    const { type, collectionId } = streamedTrack.context;
    if (type === "album") {
        return `/album/${collectionId}?scrollToTrackId=${streamedTrack.spotifyId}`;
    } else {
        return `/playlist/${collectionId}?scrollToTrackId=${streamedTrack.spotifyId}`;
    }
}

const WrapperLink = styled(Link, {
    display: "flex",
    flex: "0 0 auto",
});

const Image = styled("img", {
    borderRadius: "4px",
});

export default PlaybackTrackCoverImage;
