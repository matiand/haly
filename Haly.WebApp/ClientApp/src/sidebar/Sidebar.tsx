import { Waveform } from "@uiball/loaders";
import React from "react";
import { HiHeart, HiOutlineFire, HiOutlineHome, HiOutlineSearch, HiPlus } from "react-icons/all";

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
        <Nav style={{ width }} onMouseDown={enableResize}>
            <SpotifyBanner />
            <List>
                <NavigationItem title="Home" href="/" icon={<HiOutlineHome />} />
                <NavigationItem title="Search" href="/search" icon={<HiOutlineSearch />} />
                <NavigationItem title="New Releases" href="/search" icon={<HiOutlineFire />} />
            </List>
            <List>
                <NavigationItem
                    title="Create Playlist"
                    href=""
                    onClick={() => console.log("TODO: add playlist")}
                    icon={<HiPlus />}
                />
                <NavigationItem title="Liked Songs" href="/collection/tracks" icon={<HiHeart />} />
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
    position: "relative",
    background: "$black800",
    userSelect: "none",
});

const List = styled("ul", {
    margin: 0,
    padding: 0,
    listStyle: "none",
    fontWeight: "bold",

    "&:first-of-type": {
        marginBottom: "$700",
    },

    li: {
        cursor: "pointer",
        height: "40px",
        transition: "color 0.2s linear",
    },
});

const UserPlaylistsSection = styled(List, {
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

export default Sidebar;
