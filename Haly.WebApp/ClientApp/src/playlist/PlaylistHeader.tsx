import { useAtomValue } from "jotai";

import { PlaylistMetadataDto } from "../../generated/haly";
import { playlistDurationAtom, playlistSongsTotalAtom } from "../common/atoms";
import PageHeader from "../common/PageHeader";
import { pluralize } from "../common/pluralize";
import PlaylistOwner from "./PlaylistOwner";

type PlaylistHeaderProps = {
    name: string;
    metadata: PlaylistMetadataDto;
    isPersonalized: boolean;
};

function PlaylistHeader({ name, metadata, isPersonalized }: PlaylistHeaderProps) {
    const songsTotal = useAtomValue(playlistSongsTotalAtom);
    const duration = useAtomValue(playlistDurationAtom);

    return (
        <PageHeader title={name} type="Playlist" description={metadata.description} imageUrl={metadata.imageUrl}>
            <PlaylistOwner owner={metadata.owner} isPersonalized={isPersonalized} />

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
