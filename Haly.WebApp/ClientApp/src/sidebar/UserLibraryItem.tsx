import { useDroppable } from "@dnd-kit/core";
import clsx from "clsx";
import { HiSpeakerWave } from "react-icons/hi2";
import { NavLink } from "react-router-dom";

import { AlbumBriefDto, PlaylistBriefDto } from "../../generated/haly";
import { styled } from "../common/theme";
import useContextMenu from "../menus/useContextMenu";
import { ContextPlaybackState } from "../playback/useContextPlaybackState";
import { useContextPlaybackActions } from "../playback/usePlaybackActions";
import PlaylistContextMenu from "../playlist/menus/PlaylistContextMenu";

type UserLibraryItemProps = {
    item:
        | {
              type: "playlist";
              dto: PlaylistBriefDto;
              isEditable: boolean;
          }
        | {
              type: "album";
              dto: AlbumBriefDto;
          }
        | {
              type: "collection";
          };
    contextUri: string;
    href: string;
    playbackState: ContextPlaybackState;
};

function UserLibraryItem({ item, contextUri, href, playbackState }: UserLibraryItemProps) {
    const { playbackAction } = useContextPlaybackActions(playbackState, contextUri);
    const { onContextMenu, menuProps } = useContextMenu();

    const { isOver, setNodeRef } = useDroppable({
        id: `user-library-item-${contextUri}`,
        data: {
            type: item.type,
            contextUri,
        },
        // Avoid disabling them, it breaks scrolling in dnd flow.
        // disabled: false,
    });

    const isListenedTo = playbackState !== "none";
    const noDropping = item.type !== "playlist" || (item.type === "playlist" && !item.isEditable);
    const name = item.type === "collection" ? "Liked Songs" : item.dto.name;

    return (
        <>
            <li onContextMenu={onContextMenu} ref={setNodeRef}>
                <Link
                    className={clsx({
                        isOver,
                        noDropping,
                    })}
                    to={href}
                    onDoubleClick={playbackAction}
                >
                    <span className={clsx({ isListenedTo })}>{name}</span>

                    <span aria-hidden>{playbackState === "playing" && <Icon />}</span>
                </Link>
            </li>

            {item.type === "playlist" && (
                <PlaylistContextMenu playlist={item.dto} menuProps={menuProps} isLikedSongsCollection={false} />
            )}
        </>
    );
}

const Link = styled(NavLink, {
    alignItems: "center",
    borderRadius: "4px",
    color: "$white800",
    display: "flex",
    gap: "$600",
    justifyContent: "space-between",
    padding: "$200 $400",
    textDecoration: "none",

    "span:first-of-type": {
        fontSize: "$300",
        fontWeight: 500,
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",

        "&.isListenedTo": {
            color: "$primary400",
        },
    },

    "&:hover": {
        background: "$black500",
    },

    "&:active": {
        background: "$black800",
    },

    "&.isOver:not(.noDropping)": {
        outline: "1px solid $primary400",
    },

    ".dragging &.noDropping": {
        opacity: 0.33,
    },

    "&.active": {
        background: "$black300",

        "&:hover": {
            background: "$black100",
        },
    },
});

const Icon = styled(HiSpeakerWave, {
    color: "$primary400",
    height: "14px",
    width: "14px",
});

export default UserLibraryItem;
