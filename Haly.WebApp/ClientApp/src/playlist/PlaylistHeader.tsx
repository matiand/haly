import { useAtomValue } from "jotai";
import { Link } from "react-router-dom";

import { PlaylistMetadataDto } from "../../generated/haly";
import { userAtom } from "../common/atoms";
import PageHeader from "../common/PageHeader";
import { pluralize } from "../common/pluralize";

type PlaylistHeaderProps = {
    name: string;
    metadata: PlaylistMetadataDto;
    songsTotal: number;
    totalDuration: string;
};

function PlaylistHeader({ name, metadata, songsTotal, totalDuration }: PlaylistHeaderProps) {
    const user = useAtomValue(userAtom);
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
                    {pluralize("song", songsTotal)}, <span>{totalDuration}</span>
                </span>
            )}
        </PageHeader>
    );
}

export default PlaylistHeader;
