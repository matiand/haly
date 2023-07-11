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

function Album() {
    const { id } = useParams();
    const query = useQuery(["albums", id], () => halyClient.albums.getAlbum({ id: id! }));
    const dominantColors = useAtomValue(dominantColorsAtom);

    if (!query.data) return <LoadingIndicator />;

    const { id: albumId, name, type, imageUrl, tracks, artists, releaseDate, copyrights } = query.data;
    const dominantColor = dominantColors[imageUrl ?? ""];
    const releaseYear = releaseDate.getFullYear();
    const totalDuration = "1 hr 34 min";

    return (
        <Wrapper>
            <PageHeader title={name} type="Album" imageUrl={imageUrl} description={null}>
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
                <PlaybackToggle size="large" />
                <HeartButton size="medium" />
                <MoreOptionsButton label={`More options for album: '${name}'`} size="medium" />
            </PageControls>
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
