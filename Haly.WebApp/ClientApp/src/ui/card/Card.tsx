import { MouseEventHandler } from "react";
import { Link, useNavigate } from "react-router-dom";

import { PlaylistCardDto } from "../../../generated/haly";
import { classNames, styled } from "../../common/theme";
import useDraggable from "../../dnd/useDraggable";
import useContextMenu from "../../menus/useContextMenu";
import PlaybackToggle from "../../playback/PlaybackToggle";
import useContextPlaybackState from "../../playback/useContextPlaybackState";
import { useContextPlaybackActions } from "../../playback/usePlaybackActions";
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
    isHighlighted?: boolean;
};

function Card({ id, name, uri, href, subtitle, imageUrl, isHighlighted }: CardProps) {
    const navigate = useNavigate();
    const { menuProps, onContextMenu } = useContextMenu();

    const getPlaybackState = useContextPlaybackState();
    const playbackState = getPlaybackState(id);
    const { playbackAction } = useContextPlaybackActions(playbackState, uri);

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
            data-is-highlighted={isHighlighted}
        >
            <ImageWrapper data-is-rounded={!isAlbumOrPlaylist}>
                {imageUrl ? <img loading="eager" src={imageUrl} alt="" /> : <EmptyCoverImage type="card" />}

                {isAlbumOrPlaylist && (
                    <div id="card-playback-wrapper">
                        <PlaybackToggle size="large" isPaused={playbackState !== "playing"} toggle={playbackAction} />
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
    background: "$black400",
    borderRadius: "8px",
    cursor: "pointer",
    padding: "$600",
    transition: "background-color 0.3s ease",
    userSelect: "none",

    "&:hover, &:focus-within": {
        background: "$black200",

        "& #card-playback-wrapper": {
            opacity: 1,
            transform: "translateY(0)",
        },
    },

    "&[data-is-highlighted=true]": {
        border: "2px solid $secondary700",
    },
});

const ImageWrapper = styled("div", {
    background: "$black400",
    marginBottom: "$600",
    paddingBottom: "100%",
    position: "relative",

    "& > img": {
        background: "$black400",
        borderRadius: "4px",
        boxShadow: "0 4px 24px $cardImage",
        height: "100%",
        left: 0,
        objectFit: "cover",
        position: "absolute",
        top: 0,
        width: "100%",
    },

    "&[data-is-rounded=true]": {
        borderRadius: "50%",
        "& > img": {
            borderRadius: "50%",
        },
    },

    "& #card-playback-wrapper": {
        bottom: "8px",
        opacity: 0,
        position: "absolute",
        right: "8px",
        transform: "translateY(8px)",
        transition: "opacity 0.3s ease, transform 0.3s ease",
    },
});

const Contents = styled("div", {
    minHeight: "60px",

    "& a": {
        color: "$white800",
        display: "block",
        fontSize: "$350",
        fontWeight: 700,
        letterSpacing: "0.02em",
        textDecoration: "none",
    },

    "& div": {
        color: "$white400",
        display: "flex",
        fontSize: "$300",
        fontWeight: 500,

        "&:first-of-type": {
            marginBottom: "$300",
        },

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
