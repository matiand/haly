import { useAtomValue } from "jotai";

import { OwnerBriefDto, PlaylistWithTracksDto } from "../../generated/haly";
import { playlistDurationAtom, playlistSongsTotalAtom } from "../common/atoms";
import PageHeader from "../common/PageHeader";
import { pluralize } from "../common/pluralize";
import PlaylistOwner from "./PlaylistOwner";

type PlaylistHeaderProps = {
    name: string;
    description: PlaylistWithTracksDto["description"];
    imageUrl: PlaylistWithTracksDto["imageUrl"];
    owner: OwnerBriefDto;
    likesTotal: number;
    isPersonalized: boolean;
};

function PlaylistHeader({ name, description, imageUrl, owner, likesTotal, isPersonalized }: PlaylistHeaderProps) {
    const songsTotal = useAtomValue(playlistSongsTotalAtom);
    const duration = useAtomValue(playlistDurationAtom);

    return (
        <PageHeader title={name} type="Playlist" description={description} imageUrl={imageUrl}>
            <PlaylistOwner owner={owner} isPersonalized={isPersonalized} />

            {likesTotal > 0 && <span>{pluralize("like", likesTotal)}</span>}

            {songsTotal > 0 && (
                <span>
                    {pluralize("song", songsTotal)}, <span>{duration}</span>
                </span>
            )}
        </PageHeader>
    );
}

export default PlaylistHeader;
