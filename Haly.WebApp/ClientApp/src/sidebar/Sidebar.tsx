import { Waveform } from "@uiball/loaders";
import React from "react";
import { HiHeart, HiOutlineFire, HiPlus, MdOutlineLibraryMusic, TbShip } from "react-icons/all";

import { styled, theme } from "../common/theme";
import NavigationItem from "./NavigationItem";
import Resizer from "./Resizer";
import SpotifyBanner from "./SpotifyBanner";
import useResize from "./useResize";
import UserPlaylists from "./UserPlaylists";

function Sidebar() {
    const { defaultWidth, minWidth, maxWidth } = theme.sidebar;
    const { width, enableResize } = useResize({ defaultWidth, minWidth, maxWidth });

    return (
        <Nav id="sidebar" style={{ width }} onMouseDown={enableResize}>
            <SpotifyBanner />
            <List>
                <NavigationItem title="Your Library" href="/" icon={<MdOutlineLibraryMusic />} />
                <NavigationItem title="New Releases" href="/me" icon={<HiOutlineFire />} />
                <NavigationItem title="Voyages?" href="/me" icon={<TbShip />} />
            </List>
            <List>
                <NavigationItem
                    title="Create Playlist"
                    href=""
                    onClick={() => console.log("TODO: add playlist")}
                    icon={<HiPlus />}
                />
                <NavigationItem title="Liked Songs" href="/collection/tracks" icon={<HeartIcon />} />
            </List>

            <HorizontalBreak />

            <React.Suspense fallback={<Waveform />}>
                <UserPlaylistsSection>
                    <UserPlaylists />
                </UserPlaylistsSection>
            </React.Suspense>
            <Resizer />
        </Nav>
    );
}

const Nav = styled("nav", {
    background: "$black600",
    display: "flex",
    flexFlow: "column",
    position: "relative",
    userSelect: "none",
});

const List = styled("ul", {
    margin: 0,
    padding: 0,
    listStyle: "none",
    fontWeight: "bold",

    "&:first-of-type": {
        margin: "$700 0",
    },

    li: {
        cursor: "pointer",
        height: "40px",
        transition: "color 0.2s linear",
    },
});

const UserPlaylistsSection = styled(List, {
    overflowY: "auto",

    li: {
        cursor: "default",
        height: "32px",
        fontWeight: 500,
        transition: "none",
    },
});

const HorizontalBreak = styled("hr", {
    background: "$black300",
    border: "none",
    height: "1px",
    margin: "$400 $700",
});

const HeartIcon = styled(HiHeart, {
    color: "$primary400",
});

export default Sidebar;
