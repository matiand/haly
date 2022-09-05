import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Route, Routes } from "react-router-dom";

import useAccessToken from "./auth/useAccessToken";
import Loading from "./common/Loading";
import { styled } from "./common/theme";
import Toaster from "./common/Toaster";
import { usePlaylistHub } from "./common/useHub";
import halyClient from "./halyClient";
import Home from "./home/Home";
import SimplePlayer from "./home/SimplePlayer";
import FollowedArtists from "./me/FollowedArtists";
import HalySettings from "./me/HalySettings";
import Me from "./me/Me";
import { UserContext } from "./me/UserContext";
import LikedSongs from "./playlist/LikedSongs";
import Playlist from "./playlist/Playlist";
import Sidebar from "./sidebar/Sidebar";
import TopBar from "./topbar/TopBar";

function App() {
    const accessToken = useAccessToken();

    const { isConnected } = usePlaylistHub({
        onPlaylistTracksRefetchStarted: (data) => console.log("PlaylistTracksRefetchStarted:", data),
        onPlaylistTracksRefetchCompleted: (data) => console.log("PlaylistTracksRefetchCompleted:", data),
    });

    const {
        isLoading,
        data: user,
        error,
    } = useQuery(["users", "me"], () => halyClient.currentUser.putCurrentUser({ xSpotifyToken: accessToken }), {
        enabled: isConnected,
    });

    if (isLoading) return <Loading />;
    if (error || !user) return <Toaster />;

    return (
        <UserContext.Provider value={user}>
            <Layout>
                <TopBar />
                <Sidebar />
                <React.Suspense fallback={<Loading />}>
                    <Routes>
                        <Route index element={<Home />} />
                        <Route path="/playlists/:id" element={<Playlist />} />
                        <Route path="/me" element={<Me />}>
                            <Route path="following" element={<FollowedArtists />} />
                            <Route path="appsettings" element={<HalySettings />} />
                        </Route>
                        <Route path="/collection/tracks" element={<LikedSongs />} />
                        <Route path="/player" element={<SimplePlayer />} />
                    </Routes>
                </React.Suspense>
                <Toaster />
            </Layout>
        </UserContext.Provider>
    );
}

const Layout = styled("div", {
    position: "relative",
    display: "grid",
    gridTemplateAreas: `"sidebar topbar"
                        "sidebar main"`,
    gridTemplateColumns: "auto 1fr",
    gridTemplateRows: "auto 1fr",
    height: "100%",

    "& > header": {
        gridArea: "topbar",
    },
    "& > nav": {
        gridArea: "sidebar",
    },
    "& > main": {
        gridArea: "main",
        padding: "0 $800",
    },
});

export default App;
