import { MenuItem, SubMenu } from "@szhsin/react-menu";
import toast from "react-hot-toast";
import { HiOutlineExternalLink } from "react-icons/hi";

import { styled } from "../../common/theme";

type ShareMenuSectionProps = {
    type: "song" | "album" | "playlist";
    id?: string;
    name?: string;
    path?: string;
};

function ShareMenuItems({ type, id, name, path }: ShareMenuSectionProps) {
    if (!id && !name && !path) return null;

    const entityName = type;
    const href = path ? `${SpotifyOrigin}${path}` : undefined;

    const copyLink = () => copyToClipboard(href ?? "", "Link copied to clipboard.");
    const copyId = () => copyToClipboard(id ?? "", "Copied to clipboard.");
    const copyName = () => copyToClipboard(name ?? "", "Name copied to clipboard.");

    return (
        <>
            <SubMenu label="Share">
                {href && <MenuItem onClick={copyLink}>Copy {entityName} link</MenuItem>}
                {id && <MenuItem onClick={copyId}>Copy {entityName} id</MenuItem>}
                {name && <MenuItem onClick={copyName}>Copy {entityName} name</MenuItem>}
            </SubMenu>

            {href && (
                <MenuItemWithAnchor>
                    <a href={href} target="_blank" rel="noreferrer">
                        Open in Spotify Web
                    </a>

                    <span aria-hidden>
                        <ExternalLinkIcon />
                    </span>
                </MenuItemWithAnchor>
            )}
        </>
    );
}

const SpotifyOrigin = "https://open.spotify.com";

function copyToClipboard(text: string, toastMsg: string) {
    navigator.clipboard.writeText(text);

    toast(toastMsg);
}

const MenuItemWithAnchor = styled(MenuItem, {
    a: {
        color: "unset",
        cursor: "default",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        textDecoration: "none",
    },
});

const ExternalLinkIcon = styled(HiOutlineExternalLink, {
    height: "20px",
    width: "20px",
});

export default ShareMenuItems;
