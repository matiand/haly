import clsx from "clsx";
import { KeyboardEventHandler } from "react";
import { Link, useNavigate } from "react-router-dom";

import { classNames, styled } from "../../common/theme";
import useDraggable from "../../dnd/useDraggable";
import useContextMenu from "../../menus/useContextMenu";
import { CardProps } from "./Card";
import CardContextMenu from "./CardContextMenu";

const imgSize = 80;

function MiniCard({ id, name, uri, href, subtitle, imageUrl }: CardProps) {
    const navigate = useNavigate();
    const { onContextMenu, menuProps } = useContextMenu();

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

    const navigateOnEnter: KeyboardEventHandler = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            navigate(href);
        }
    };

    return (
        <Wrapper ref={draggableRef} {...draggableProps} onContextMenu={onContextMenu}>
            {imageUrl && (
                <ImageWrapper tabIndex={0} role="button" onClick={() => navigate(href)} onKeyDown={navigateOnEnter}>
                    <img
                        className={clsx({ isRounded: !isAlbumOrPlaylist })}
                        loading="eager"
                        src={imageUrl}
                        alt=""
                        height={imgSize}
                        width={imgSize}
                    />
                </ImageWrapper>
            )}

            <ContentWrapper>
                <Link className={classNames.clampEllipsis} to={href} title={name}>
                    {name}
                </Link>
                {subtitle && <Subtitle className={classNames.clampEllipsis}>{subtitle}</Subtitle>}
            </ContentWrapper>

            {isAlbumOrPlaylist && <CardContextMenu id={id} name={name} uri={uri} menuProps={menuProps} />}
        </Wrapper>
    );
}

const Wrapper = styled("div", {
    columnGap: "$600",
    display: "grid",
    gridTemplateColumns: "auto 1fr",
    userSelect: "none",
});

const ImageWrapper = styled("div", {
    cursor: "pointer",
    height: `${imgSize}px`,
    width: `${imgSize}px`,

    "& > img": {
        borderRadius: "4px",
        objectFit: "cover",
        objectPosition: "center center",

        "&.isRounded": {
            borderRadius: "50%",
        },
    },
});

const ContentWrapper = styled("div", {
    alignSelf: "center",

    "& > a": {
        color: "$white800",
        fontSize: "$300",
        fontWeight: 500,
        gridArea: "title",
        letterSpacing: "0.04em",
        textDecoration: "none",

        "&:hover": {
            textDecoration: "underline",
        },
    },
});

const Subtitle = styled("div", {
    color: "$white500",
    fontSize: "$200",
    fontWeight: 500,
});

export default MiniCard;
