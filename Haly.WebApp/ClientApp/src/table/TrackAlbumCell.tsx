import { Link } from "react-router-dom";

import { PlaylistTrackDto, TrackDto } from "../../generated/haly";
import AlbumContextMenu from "../album/menus/AlbumContextMenu";
import { classNames, styled } from "../common/theme";
import useDraggable from "../dnd/useDraggable";
import useContextMenu from "../menus/useContextMenu";
import HighlightableText from "./HighlightableText";

type TrackAlbumCellProps = {
    track: PlaylistTrackDto | TrackDto;
    searchTerm?: string | null;
};

function TrackAlbumCell({ track, searchTerm }: TrackAlbumCellProps) {
    const { onContextMenu: openAlbumCtxMenu, menuProps } = useContextMenu();

    const { draggableRef, ...draggableProps } = useDraggable({
        id: `track-album-cell:${track.album.id}`,
        data: {
            id: track.album.id,
            type: "album",
            title: track.album.name,
        },
    });

    const isLocal = !track.id;

    return (
        <Wrapper>
            {track.isSong && !isLocal ? (
                <Link
                    ref={draggableRef}
                    {...draggableProps}
                    onContextMenu={(e) => {
                        e.stopPropagation();

                        openAlbumCtxMenu(e);
                    }}
                    className={classNames.clampEllipsis}
                    to={`/album/${track.album.id}`}
                >
                    <HighlightableText text={track.album.name} markedText={searchTerm} />
                </Link>
            ) : (
                <span className={classNames.clampEllipsis}>{track.album.name}</span>
            )}

            <AlbumContextMenu album={track.album} menuProps={menuProps} />
        </Wrapper>
    );
}

const Wrapper = styled("span", {
    color: "$white500",
    fontSize: "$300",
    fontWeight: 500,

    "& a": {
        color: "inherit",
        textDecoration: "none",

        "&:hover": {
            textDecoration: "underline",
        },

        span: {
            display: "inline",
        },
    },
});

export default TrackAlbumCell;
