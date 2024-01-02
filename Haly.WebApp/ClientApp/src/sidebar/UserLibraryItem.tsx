import clsx from "clsx";
import { HiSpeakerWave } from "react-icons/hi2";
import { TbPinFilled } from "react-icons/tb";
import { NavLink } from "react-router-dom";

import { AlbumBriefDto, PlaylistBriefDto } from "../../generated/haly";
import { styled } from "../common/theme";
import useDroppable from "../dnd/useDroppable";
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
    isPinned?: boolean;
};

function UserLibraryItem({ item, contextUri, href, playbackState, isPinned }: UserLibraryItemProps) {
    const { playbackAction } = useContextPlaybackActions(playbackState, contextUri);
    const { onContextMenu, menuProps } = useContextMenu();

    const notDroppable = item.type !== "playlist" || (item.type === "playlist" && !item.isEditable);
    const { droppableRef, classNames: dndClassNames } = useDroppable({
        id: `user-library-item-${contextUri}`,
        data: {
            type: item.type,
            contextUri,
        },
        // Disabling them when dragging is in progress, makes scrolling near the edges of sidebar buggy.
        disabled: notDroppable,
    });

    const isListenedTo = playbackState !== "none";
    const name = item.type === "collection" ? "Liked Songs" : item.dto.name;

    return (
        <>
            <li ref={droppableRef} onContextMenu={onContextMenu}>
                <Anchor className={clsx({ isListenedTo, ...dndClassNames })} to={href} onDoubleClick={playbackAction}>
                    {isPinned && (
                        <span aria-hidden>
                            <PinIcon />
                        </span>
                    )}

                    <NameWrapper>
                        <span>{name}</span>

                        {playbackState === "playing" && (
                            <span aria-hidden>
                                <SpeakerIcon />
                            </span>
                        )}
                    </NameWrapper>
                </Anchor>
            </li>

            {item.type === "playlist" && (
                <PlaylistContextMenu playlist={item.dto} menuProps={menuProps} isLikedSongsCollection={false} />
            )}
        </>
    );
}

const Anchor = styled(NavLink, {
    alignItems: "center",
    borderRadius: "4px",
    color: "$white800",
    display: "flex",
    gap: "$400",
    padding: "$200 $400",
    textDecoration: "none",

    "&:hover": {
        background: "$black500",
    },

    "&:active": {
        background: "$black800",
    },

    "&.isListenedTo": {
        color: "$primary400",
    },

    "&.active": {
        background: "$black300",

        "&:hover": {
            background: "$black100",
        },
    },
});

const NameWrapper = styled("div", {
    alignItems: "center",
    display: "flex",
    flexGrow: 1,
    gap: "$600",
    justifyContent: "space-between",
    overflow: "hidden",

    "& > span:first-of-type": {
        fontSize: "$300",
        fontWeight: 500,
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
    },
});

const PinIcon = styled(TbPinFilled, {
    color: "$primary400",
    height: "16px",
    width: "16px",
});

const SpeakerIcon = styled(HiSpeakerWave, {
    height: "14px",
    width: "14px",
});

export default UserLibraryItem;
