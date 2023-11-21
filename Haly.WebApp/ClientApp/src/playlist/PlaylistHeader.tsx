import { useAtomValue, useSetAtom } from "jotai";
import React from "react";

import { PlaylistWithTracksDto } from "../../generated/haly";
import { modalAtom } from "../common/atoms/modalAtoms";
import { playlistSliceDurationAtom, playlistSliceSongsTotalAtom } from "../common/atoms/playlistAtoms";
import { pluralize } from "../common/pluralize";
import PageHeader from "../ui/PageHeader";
import PlaylistOwner from "./PlaylistOwner";

type PlaylistHeaderProps = {
    playlist: PlaylistWithTracksDto;
    onContextMenu: (e: React.MouseEvent) => void;
};

function PlaylistHeader({ playlist, onContextMenu }: PlaylistHeaderProps) {
    const { id, name, description, imageUrl, owner, likesTotal, totalDuration, isPersonalized } = playlist;

    const setModal = useSetAtom(modalAtom);
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
                onTitleClick={() =>
                    setModal({
                        type: "editPlaylistDetails",
                        props: {
                            id,
                            name,
                            description: description ?? "",
                        },
                    })
                }
            >
                <PlaylistOwner owner={owner} isPersonalized={isPersonalized} />

                {likesTotal > 0 && <span>{pluralize("like", likesTotal)}</span>}

                {songsTotalValue > 0 && (
                    <span>
                        {pluralize("song", songsTotalValue)}, <span>{durationValue}</span>
                    </span>
                )}
            </PageHeader>
        </>
    );
}

export default PlaylistHeader;
