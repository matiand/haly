import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai/index";
import { Link, useParams } from "react-router-dom";

import { dominantColorsAtom } from "../common/atoms";
import HeartButton from "../common/HeartButton";
import LoadingIndicator from "../common/LoadingIndicator";
import MoreOptionsButton from "../common/MoreOptionsButton";
import PageControls from "../common/PageControls";
import PageHeader from "../common/PageHeader";
import { pluralize } from "../common/pluralize";
import { styled } from "../common/theme";
import halyClient from "../halyClient";
import PlaybackToggle from "../playback/PlaybackToggle";
import PlaylistGradient from "../playlist/PlaylistGradient";
import Copyrights from "./Copyrights";

function Album() {
    const { id } = useParams();
    const query = useQuery(["albums", id], () => halyClient.albums.getAlbum({ id: id! }));
    const dominantColors = useAtomValue(dominantColorsAtom);

    if (!query.data) return <LoadingIndicator />;

    const {
        id: albumId,
        name,
        typeName,
        imageUrl,
        totalDuration,
        tracks,
        artists,
        releaseYear,
        formattedReleaseDate,
        copyrights,
    } = query.data;
    const dominantColor = dominantColors[imageUrl ?? ""];
    const isPlayable = tracks.some((t) => t.isPlayable);

    return (
        <Wrapper>
            <PageHeader title={name} subtitle={typeName} type="Album" imageUrl={imageUrl} description={null}>
                {artists.map((a) => {
                    const artistHref = `/artist/${a.id}`;
                    return (
                        <span key={a.id}>
                            <Link to={artistHref}>
                                <strong>{a.name}</strong>
                            </Link>
                        </span>
                    );
                })}
                <span>{releaseYear}</span>
                <span>
                    {pluralize("song", tracks.length)}, <span>{totalDuration}</span>
                </span>
            </PageHeader>

            <PageControls>
                {isPlayable && <PlaybackToggle size="large" />}
                <HeartButton size="medium" />
                <MoreOptionsButton label={`More options for album: '${name}'`} size="medium" />
            </PageControls>

            <Copyrights text={copyrights} date={formattedReleaseDate} />

            <PlaylistGradient color={dominantColor} type="major" />
            <PlaylistGradient color={dominantColor} type="minor" />
        </Wrapper>
    );
}

const Wrapper = styled("div", {
    padding: "$800 $700",
    position: "relative",
});

export default Album;
