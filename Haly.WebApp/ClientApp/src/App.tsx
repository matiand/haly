import React from "react";
import { useQuery } from "react-query";
import { Route, Routes } from "react-router-dom";

import useAccessToken from "./auth/useAccessToken";
import Loading from "./common/Loading";
import { styled } from "./common/theme";
import Toaster from "./common/Toaster";
import { usePlaylistHub } from "./common/useHub";
import Home from "./home/Home";
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
    } = useQuery(["users", "me"], () => fetchUserInfo(accessToken), { enabled: isConnected });

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

async function fetchUserInfo(accessToken: string) {
    const resp = await fetch(`${import.meta.env.VITE_API_ORIGIN}/users/me`, {
        method: "PUT",
        headers: { "x-spotify-token": accessToken },
    });
    if (!resp.ok) throw new Error(resp.statusText);

    console.log("User:", resp.statusText);
    return resp.json();
}

export default App;