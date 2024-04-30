import clsx from "clsx";
import React from "react";
import isDeepEqual from "react-fast-compare";
import { HiSpeakerWave } from "react-icons/hi2";
import { TbPinFilled } from "react-icons/tb";

import { AlbumBriefDto, PlaylistBriefDto } from "../../generated/haly";
import { styled } from "../common/theme";
import DroppableLibraryItem from "../dnd/DroppableLibraryItem";
import { LibraryItemArea } from "../dnd/useDroppableArea";
import useContextMenu from "../menus/useContextMenu";
import { ContextPlaybackState } from "../playback/useContextPlaybackState";
import { useContextPlayback } from "../playback/usePlaybackMutations";
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
    const { togglePlayback } = useContextPlayback({
        contextUri: uri,
        playbackState,
    });
    const { onContextMenu, menuProps } = useContextMenu();

    const isListenedTo = playbackState !== "none";
    const name = item.type === "collection" ? "Liked Songs" : item.dto.name;

    const notDroppable = item.type !== "playlist" || (item.type === "playlist" && !item.isEditable);
    const area: LibraryItemArea | undefined = notDroppable
        ? undefined
        : {
              id: `library:${uri}`,
              data: {
                  id: item.dto.id,
                  type: item.type,
              },
              disabled: notDroppable,
          };

    return (
        <>
            <ListItem
                onDoubleClick={togglePlayback}
                onContextMenu={onContextMenu}
                className={clsx({ isListenedTo })}
                data-testid={`library-item-${item.type}`}
            >
                <DroppableLibraryItem href={href} area={area}>
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
                </DroppableLibraryItem>
            </ListItem>

            {item.type === "playlist" && (
                <PlaylistContextMenu playlist={item.dto} menuProps={menuProps} isLikedSongsCollection={false} />
            )}
        </>
    );
}

const ListItem = styled("li", {
    a: {
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

        "&.active": {
            background: "$black300",

            "&:hover": {
                background: "$black100",
            },
        },
    },

    "&.isListenedTo > a": {
        color: "$primary400",
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

export default React.memo(UserLibraryItem, isDeepEqual);
