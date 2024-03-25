import clsx from "clsx";
import { MouseEventHandler } from "react";
import { Link, useNavigate } from "react-router-dom";

import { PlaylistCardDto } from "../../../generated/haly";
import { classNames, styled } from "../../common/theme";
import useDraggable from "../../dnd/useDraggable";
import useContextMenu from "../../menus/useContextMenu";
import PlaybackToggle from "../../playback/PlaybackToggle";
import useContextPlaybackState from "../../playback/useContextPlaybackState";
import { useContextPlayback } from "../../playback/usePlaybackMutations";
import EmptyCoverImage from "../EmptyCoverImage";
import CardContextMenu from "./CardContextMenu";

export type CardProps = {
    id: string;
    name: string;
    uri: string;
    href: string;

    // A subtitle OR or a year + subtitle tuple
    subtitle?: string | [number, string];
    imageUrl?: PlaylistCardDto["imageUrl"];
};

function Card({ id, name, uri, href, subtitle, imageUrl }: CardProps) {
    const navigate = useNavigate();
    const { menuProps, onContextMenu } = useContextMenu();

    const getPlaybackState = useContextPlaybackState();
    const playbackState = getPlaybackState(uri);
    const { togglePlayback } = useContextPlayback({
        contextUri: uri,
        playbackState,
    });

    const isAlbumOrPlaylist = /album|playlist/.test(uri);
    const { draggableRef, ...draggableProps } = useDraggable(
        isAlbumOrPlaylist
            ? {
                  id: `card:${id}`,
                  data: {
                      id,
                      type: /album/.test(uri) ? "album" : "playlist",
                      title: name,
                  },
              }
            : undefined,
    );

    const navigateOnClick: MouseEventHandler = (e) => {
        const target = e.target as HTMLElement;
        // If it's not a link, navigate programmatically.
        if (target.tagName !== "A" && menuProps.state === "closed") {
            navigate(href);
        }
    };

    return (
        <Wrapper
            ref={draggableRef}
            {...draggableProps}
            onClick={navigateOnClick}
            onContextMenu={onContextMenu}
            className={clsx({ isCurrentlyPlaying: playbackState === "playing" })}
        >
            <ImageWrapper className={clsx({ isRounded: !isAlbumOrPlaylist })}>
                {imageUrl ? <img loading="eager" src={imageUrl} alt="" /> : <EmptyCoverImage type="card" />}

                {uri && (
                    <div className="cardPlaybackWrapper">
                        <PlaybackToggle size="medium" isPaused={playbackState !== "playing"} toggle={togglePlayback} />
                    </div>
                )}
            </ImageWrapper>

            <Contents>
                <div>
                    <Link className={classNames.ellipsis} to={href} title={name}>
                        {name}
                    </Link>
                </div>

                {typeof subtitle === "string" && <Subtitle className={classNames.clampEllipsis}>{subtitle}</Subtitle>}
                {typeof subtitle === "object" && (
                    <Subtitle>
                        <time dateTime={subtitle[0].toString()}>{subtitle[0]}</time>
                        <span className={classNames.ellipsis}>{subtitle[1]}</span>
                    </Subtitle>
                )}
            </Contents>

            {isAlbumOrPlaylist && <CardContextMenu id={id} name={name} uri={uri} menuProps={menuProps} />}
        </Wrapper>
    );
}

const Wrapper = styled("div", {
    $$borderRadius: "6px",

    background: "transparent",
    borderRadius: "$$borderRadius",
    cursor: "pointer",
    padding: "$500",
    transition: "background-color 0.3s ease",
    userSelect: "none",

    "&:hover": {
        background: "$black400",
    },

    "&:hover, &:focus-within, &.isCurrentlyPlaying": {
        "& .cardPlaybackWrapper": {
            opacity: 1,
            transform: "translateY(0)",
        },
    },
});

const ImageWrapper = styled("div", {
    background: "$black200",
    borderRadius: "$$borderRadius",
    marginBottom: "$400",
    paddingBottom: "100%",
    position: "relative",

    "& > img": {
        background: "$black200",
        borderRadius: "$$borderRadius",
        boxShadow: "0 4px 24px $cardImage",
        height: "100%",
        left: 0,
        objectFit: "cover",
        position: "absolute",
        top: 0,
        width: "100%",
    },

    "&.isRounded": {
        borderRadius: "50%",
        "& > img": {
            borderRadius: "50%",
        },
    },

    "& .cardPlaybackWrapper": {
        bottom: "8px",
        borderRadius: "50%",
        boxShadow: "0 8px 8px $cardPlaybackWrapper",
        opacity: 0,
        position: "absolute",
        right: "8px",
        transform: "translateY(8px)",
        transition: "opacity 0.3s ease, transform 0.3s ease",
    },
});

const Contents = styled("div", {
    display: "flex",
    flexFlow: "column nowrap",
    gap: "$200",
    justifyContent: "flex-start",

    "& a": {
        color: "$white800",
        display: "block",
        fontSize: "$350",
        fontWeight: 500,
        letterSpacing: "0.02em",
        textDecoration: "none",
    },

    "& div": {
        color: "$white300",
        display: "flex",
        fontSize: "$300",
        fontWeight: 500,

        "& > span::before": {
            content: "•",
            fontWeight: 100,
            margin: "0 $200",
        },
    },
});

const Subtitle = styled("div", {
    [`&.${classNames.clampEllipsis}`]: {
        display: "-webkit-box",
        "-webkit-line-clamp": 2,
        wordBreak: "break-word",
    },
});

export default Card;
