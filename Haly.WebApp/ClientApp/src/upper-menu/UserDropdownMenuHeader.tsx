import { useAtom } from "jotai";

import { PrivateUserDto } from "../../generated/haly";
import { playlistIdsWithOldTracksAtom } from "../common/atoms/playlistAtoms";
import { classNames, styled, theme } from "../common/theme";

type UserDropdownMenuHeaderProps = {
    user: PrivateUserDto;
};

function UserDropdownMenuHeader({ user: { name, imageUrl } }: UserDropdownMenuHeaderProps) {
    const [playlistWithOldTracks] = useAtom(playlistIdsWithOldTracksAtom);
    const title = playlistWithOldTracks.length === 0 ? "Library Synced" : "Syncing playlists";
    const badge = playlistWithOldTracks.length === 0 ? "Synced" : `Syncing (${playlistWithOldTracks.length} left)`;

    return (
        <HeaderWrapper title={title} css={{ columnGap: imageUrl ? theme.space[600] : 0 }}>
            {imageUrl && <img alt="" src={imageUrl} loading="eager" />}

            <div className={classNames.clampEllipsis}>{name}</div>
            <span className={classNames.clampEllipsis}>{badge}</span>
        </HeaderWrapper>
    );
}

const HeaderWrapper = styled("div", {
    alignItems: "center",
    display: "grid",
    gridTemplate: `"img name"
                   "img badge" / auto 1fr`,
    rowGap: "$200",

    img: {
        $$imgSize: "44px",

        borderRadius: "50%",
        gridArea: "img",
        height: "$$imgSize",
        objectFit: "cover",
        objectPosition: "center center",
        width: "$$imgSize",
    },

    div: {
        fontSize: "$300",
        fontWeight: 500,
        gridArea: "name",
    },

    span: {
        color: "$white700",
        fontSize: "$100",
        fontWeight: 400,
        gridArea: "badge",
    },
});

export default UserDropdownMenuHeader;
