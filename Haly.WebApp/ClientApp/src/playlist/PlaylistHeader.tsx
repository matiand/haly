import { useAtomValue } from "jotai";

import { OwnerBriefDto, PlaylistWithTracksDto } from "../../generated/haly";
import { playlistSliceDurationAtom, playlistSliceSongsTotalAtom } from "../common/atoms";
import PageHeader from "../common/PageHeader";
import { pluralize } from "../common/pluralize";
import PlaylistOwner from "./PlaylistOwner";

type PlaylistHeaderProps = {
    name: string;
    description: PlaylistWithTracksDto["description"];
    imageUrl: PlaylistWithTracksDto["imageUrl"];
    owner: OwnerBriefDto;
    likesTotal: number;
    duration: string;
    songsTotal: number;
    isPersonalized: boolean;
};

function PlaylistHeader({
    name,
    description,
    imageUrl,
    owner,
    likesTotal,
    duration,
    songsTotal,
    isPersonalized,
}: PlaylistHeaderProps) {
    const sliceSongsTotal = useAtomValue(playlistSliceSongsTotalAtom);
    const sliceDuration = useAtomValue(playlistSliceDurationAtom);

    const songsTotalValue = sliceSongsTotal === null ? songsTotal : sliceSongsTotal;
    const durationValue = sliceDuration || duration;

    return (
        <PageHeader title={name} type="Playlist" description={description} imageUrl={imageUrl}>
            <PlaylistOwner owner={owner} isPersonalized={isPersonalized} />

            {likesTotal > 0 && <span>{pluralize("like", likesTotal)}</span>}

            {songsTotalValue > 0 && (
                <span>
                    {pluralize("song", songsTotalValue)}, <span>{durationValue}</span>
                </span>
            )}
        </PageHeader>
    );
}

export default PlaylistHeader;
