import { useAtomValue } from "jotai";
import { Link } from "react-router-dom";

import { PlaylistMetadataDto } from "../../generated/haly";
import { playlistDurationAtom, playlistSongsTotalAtom, userAtom } from "../common/atoms";
import PageHeader from "../common/PageHeader";
import { pluralize } from "../common/pluralize";

type PlaylistHeaderProps = {
    name: string;
    metadata: PlaylistMetadataDto;
};

function PlaylistHeader({ name, metadata }: PlaylistHeaderProps) {
    const user = useAtomValue(userAtom);
    const songsTotal = useAtomValue(playlistSongsTotalAtom);
    const duration = useAtomValue(playlistDurationAtom);
    const owner = metadata.owner;
    const ownerHref = owner.id === user?.id ? "/me" : `/user/${owner.id}`;

    return (
        <PageHeader title={name} type="Playlist" description={metadata.description} imageUrl={metadata.imageUrl}>
            <span>
                <Link to={ownerHref}>
                    <strong>{owner.name}</strong>
                </Link>
            </span>
            {metadata.likesTotal > 0 && <span>{pluralize("like", metadata.likesTotal)}</span>}

            {songsTotal > 0 && (
                <span>
                    {pluralize("song", songsTotal)}, <span>{duration}</span>
                </span>
            )}
        </PageHeader>
    );
}

export default PlaylistHeader;
