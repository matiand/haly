import { useNavigate } from "react-router-dom";

import { ArtistCardDto, PlaylistCardDto, ReleaseItemDto } from "../../generated/haly";
import { capitalize } from "../common/capitalize";
import { classNames, styled } from "../common/theme";
import useDraggable from "../dnd/useDraggable";
import useContextMenu from "../menus/useContextMenu";
import * as Block from "../ui/block/Block";
import BlockImage from "../ui/block/BlockImage";
import CardContextMenu from "../ui/card/CardContextMenu";

type TopResultBlockProps = {
    card: ArtistCardDto | ReleaseItemDto | PlaylistCardDto;
    uri: string;
};

function TopResultBlock({ card, uri }: TopResultBlockProps) {
    const navigate = useNavigate();
    const { menuProps, onContextMenu } = useContextMenu();

    const { id, name, imageUrl } = card;

    const type = uri.split(":")[1];
    const onClick = () => navigate(`/${type}/${id}`);
    const isAlbumOrPlaylist = /album|playlist/.test(uri);

    const { draggableRef, ...draggableProps } = useDraggable(
        isAlbumOrPlaylist
            ? {
                  id: `top-result-block:${id}`,
                  data: {
                      id,
                      type: /album/.test(uri) ? "album" : "playlist",
                      title: name,
                  },
              }
            : undefined,
    );

    return (
        <BlockRoot ref={draggableRef} {...draggableProps} onClick={onClick} onContextMenu={onContextMenu}>
            <BlockImage imageUrl={imageUrl} size={64} />

            <Block.Grid type="default">
                <Block.Title className={classNames.clampEllipsis}>{name}</Block.Title>
                <Block.Subtitle className={classNames.clampEllipsis}>{capitalize(type)}</Block.Subtitle>
            </Block.Grid>

            {isAlbumOrPlaylist && <CardContextMenu id={id} name={name} uri={uri} menuProps={menuProps} />}
        </BlockRoot>
    );
}

const BlockRoot = styled(Block.Root, {
    borderRadius: "4px",
    cursor: "pointer",
    gap: "$600",
    padding: "$400",
    userSelect: "none",

    img: {
        objectFit: "cover",
    },

    [`& .${classNames.clampEllipsis}`]: {
        lineHeight: 2,
    },

    "&:hover": {
        background: "$trackHover",
    },
});

export default TopResultBlock;
