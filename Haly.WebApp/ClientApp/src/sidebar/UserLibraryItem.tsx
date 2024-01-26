import clsx from "clsx";
import { HiSpeakerWave } from "react-icons/hi2";
import { TbPinFilled } from "react-icons/tb";
import { NavLink } from "react-router-dom";

import { AlbumBriefDto, PlaylistBriefDto } from "../../generated/haly";
import { styled } from "../common/theme";
import useDroppableArea from "../dnd/useDroppableArea";
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
    uri: string;
    href: string;
    playbackState: ContextPlaybackState;
    isPinned?: boolean;
};

function UserLibraryItem({ item, uri, href, playbackState, isPinned }: UserLibraryItemProps) {
    const { playbackAction } = useContextPlaybackActions(playbackState, uri);
    const { onContextMenu, menuProps } = useContextMenu();

    const notDroppable = item.type !== "playlist" || (item.type === "playlist" && !item.isEditable);
    const { droppableRef, classNames: dndClassNames } = useDroppableArea(
        notDroppable
            ? undefined
            : {
                  id: `library:${uri}`,
                  data: {
                      id: item.dto.id,
                      type: item.type,
                  },
                  disabled: notDroppable,
              },
    );

    const isListenedTo = playbackState !== "none";
    const name = item.type === "collection" ? "Liked Songs" : item.dto.name;

    return (
        <>
            <li>
                {/*We don't style the 'li', so it's better to give the 'dndClassNames' to Anchor instead.*/}
                <Anchor
                    ref={droppableRef}
                    className={clsx({ isListenedTo, ...dndClassNames })}
                    to={href}
                    onDoubleClick={playbackAction}
                    onContextMenu={onContextMenu}
                >
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
