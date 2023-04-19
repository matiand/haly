import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Route, Routes } from "react-router-dom";

import useSpotifyToken from "./auth/useSpotifyToken";
import Loading from "./common/Loading";
import { styled } from "./common/theme";
import Toaster from "./common/Toaster";
import { useMessageHub } from "./common/useMessageHub";
import halyClient from "./halyClient";
import Home from "./home/Home";
import SimplePlayer from "./home/SimplePlayer";
import FollowedArtists from "./me/FollowedArtists";
import HalySettings from "./me/HalySettings";
import Me from "./me/Me";
import { UserContext } from "./me/UserContext";
import PlayingBar from "./playlingbar/PlayingBar";
import LikedSongs from "./playlist/LikedSongs";
import Playlist from "./playlist/Playlist";
import Sidebar from "./sidebar/Sidebar";
import StatusBar from "./statusbar/StatusBar";

function App() {
    const spotifyToken = useSpotifyToken();
    useMessageHub();

    const {
        isLoading,
        data: user,
        error,
    } = useQuery(["me"], () => halyClient.me.putCurrentUser({ body: spotifyToken }));

    if (isLoading) return <Loading />;
    if (error || !user) return <Toaster />;

    return (
        <UserContext.Provider value={user}>
            <Layout>
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
                <PlayingBar />
                <StatusBar />
                <Toaster />
            </Layout>
        </UserContext.Provider>
    );
}

export const Layout = styled("div", {
    background: "$black800",
    position: "relative",
    display: "grid",
    gridTemplateAreas: `"sidebar main"
                        "sidebar main"
                        "playingbar playingbar"
                        "statusbar statusbar"`,
    gridTemplateColumns: "auto 1fr",
    gridTemplateRows: "auto 1fr auto auto",
    height: "100%",

    "& > #topbar": {
        gridArea: "topbar",
    },
    "& > main": {
        // TODO: clean this up
        background: "$black800",
        color: "$white",
        gridArea: "main",
        padding: "0 $800",
        overflow: "auto",
    },
    "& > #sidebar": {
        gridArea: "sidebar",
    },
    "& > #playingbar": {
        gridArea: "playingbar",
    },
});

export default App;
