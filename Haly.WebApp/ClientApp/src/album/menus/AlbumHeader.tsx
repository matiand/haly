import { useSetAtom } from "jotai/index";
import React from "react";
import { Link } from "react-router-dom";

import { AlbumDetailedDto } from "../../../generated/haly";
import { modalAtom } from "../../common/atoms/modalAtoms";
import { pluralize } from "../../common/pluralize";
import PageHeader from "../../ui/PageHeader";

type AlbumHeaderProps = {
    album: AlbumDetailedDto;
    onContextMenu: (e: React.MouseEvent) => void;
};

function AlbumHeader({ album, onContextMenu }: AlbumHeaderProps) {
    const setModal = useSetAtom(modalAtom);

    const onViewArtwork = () =>
        setModal({
            type: "displayAlbumArtwork",
            props: { imageUrl: album.imageUrl! },
        });

    return (
        <PageHeader
            title={album.name}
            subtitle={album.type}
            type="Album"
            imageUrl={album.imageUrl}
            onContextMenu={onContextMenu}
            onViewArtwork={onViewArtwork}
            draggableData={{
                type: "album",
                id: album.id,
                title: album.name,
            }}
        >
            {album.artists.map((a) => {
                const artistHref = `/artist/${a.id}`;
                if (a.name === "Various Artists") {
                    return <span key={a.id}>{a.name}</span>;
                }

                return (
                    <span key={a.id}>
                        <Link to={artistHref}>
                            <strong>{a.name}</strong>
                        </Link>
                    </span>
                );
            })}

            <span title={album.formattedReleaseDate}>{album.releaseYear}</span>

            <span>
                {pluralize("song", album.tracks.length)}, <span>{album.totalDuration}</span>
            </span>
        </PageHeader>
    );
}

export default AlbumHeader;
