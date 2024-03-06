import { Link } from "react-router-dom";

import { ReleaseItemDto } from "../../generated/haly";
import { classNames, styled } from "../common/theme";
import * as Block from "../ui/block/Block";
import BlockImage from "../ui/block/BlockImage";

type ReleaseInformationCellProps = {
    release: ReleaseItemDto;
};

function ReleaseInformationCell({ release }: ReleaseInformationCellProps) {
    return (
        <Block.Root>
            <BlockImage imageUrl={release.imageUrl} />

            <Block.Grid type="default">
                <Title className={classNames.clampEllipsis}>
                    <Link to={`/album/${release.id}`}>{release.name}</Link>
                </Title>

                <Subtitle className={classNames.clampEllipsis}>
                    {release.artists.map((a) => {
                        return (
                            // These links shouldn't be tabbable.
                            <Link key={a.id} to={`/artist/${a.id}`} tabIndex={-1}>
                                <span>{a.name}</span>
                            </Link>
                        );
                    })}
                </Subtitle>
            </Block.Grid>
        </Block.Root>
    );
}

const Title = styled(Block.Title, {
    "& > a": {
        color: "inherit",
        display: "inline",
        textDecoration: "none",

        "&:hover": {
            textDecoration: "underline",
        },
    },
});

const Subtitle = styled(Block.Subtitle, {
    "& > a": {
        color: "$white500",
        cursor: "pointer",
        display: "inline",
        fontSize: "$200",
        textDecoration: "none",

        "&:hover": {
            color: "$white800",
            textDecoration: "underline",
        },

        "&:not(:last-child):after": {
            content: ",",

            // Inline-block removes the underline from this pseudo element.
            display: "inline-block",
            marginRight: "$100",
        },
    },
});

export default ReleaseInformationCell;
