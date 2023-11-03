import { useAtomValue } from "jotai";
import React, { useState } from "react";

import { PlaylistWithTracksDto } from "../../generated/haly";
import { playlistSliceDurationAtom, playlistSliceSongsTotalAtom } from "../common/atoms";
import { pluralize } from "../common/pluralize";
import PageHeader from "../ui/PageHeader";
import EditPlaylistDetailsModal from "./EditPlaylistDetailsModal";
import PlaylistOwner from "./PlaylistOwner";

type PlaylistHeaderProps = {
    playlist: PlaylistWithTracksDto;
    onContextMenu: (e: React.MouseEvent) => void;
};

function PlaylistHeader({ playlist, onContextMenu }: PlaylistHeaderProps) {
    const { id, name, description, imageUrl, owner, likesTotal, totalDuration, isPersonalized } = playlist;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const sliceSongsTotal = useAtomValue(playlistSliceSongsTotalAtom);
    const sliceDuration = useAtomValue(playlistSliceDurationAtom);

    const songsTotalValue = sliceSongsTotal === null ? playlist.tracks.total : sliceSongsTotal;
    const durationValue = sliceDuration || totalDuration;

    return (
        <>
            <PageHeader
                title={name}
                type="Playlist"
                description={description}
                imageUrl={imageUrl}
                onContextMenu={onContextMenu}
                onTitleClick={() => setIsModalOpen(true)}
            >
                <PlaylistOwner owner={owner} isPersonalized={isPersonalized} />

                {likesTotal > 0 && <span>{pluralize("like", likesTotal)}</span>}

                {songsTotalValue > 0 && (
                    <span>
                        {pluralize("song", songsTotalValue)}, <span>{durationValue}</span>
                    </span>
                )}
            </PageHeader>

            {isModalOpen && (
                <EditPlaylistDetailsModal
                    id={id}
                    name={name}
                    description={description ?? ""}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </>
    );
}

export default PlaylistHeader;
