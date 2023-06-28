import { useQuery } from "@tanstack/react-query";
import { Route, Routes } from "react-router-dom";

import useSpotifyToken from "./auth/useSpotifyToken";
import LikedSongs from "./collections/LikedSongs";
import LoadingIndicator from "./common/LoadingIndicator";
import ScrollArea from "./common/ScrollArea";
import { styled } from "./common/theme";
import Toaster from "./common/Toaster";
import { useMessageHub } from "./common/useMessageHub";
import halyClient from "./halyClient";
import Home from "./home/Home";
import FollowedArtists from "./me/FollowedArtists";
import HalySettings from "./me/HalySettings";
import Me from "./me/Me";
import { UserContext } from "./me/UserContext";
import Playback from "./playback/Playback";
import SimplePlayer from "./playback/SimplePlayer";
import Playlist from "./playlist/Playlist";
import Sidebar from "./sidebar/Sidebar";
import UpperMenu from "./uppermenu/UpperMenu";

function App() {
    const spotifyToken = useSpotifyToken();
    useMessageHub();

    const {
        isLoading,
        data: user,
        error,
    } = useQuery(["me"], () => halyClient.me.putCurrentUser({ body: spotifyToken }));

    if (isLoading) return <LoadingIndicator />;
    if (error || !user) return <Toaster />;

    return (
        <UserContext.Provider value={user}>
            <Layout>
                <UpperMenu />
                <Sidebar />

                <Main>
                    <ScrollArea>
                        {/*<React.Suspense fallback={<Loading />}>*/}
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
                        {/*</React.Suspense>*/}
                    </ScrollArea>
                </Main>

                <Playback />
                {/*<StatusBar />*/}
                <Toaster />
            </Layout>
        </UserContext.Provider>
    );
}

export const Layout = styled("div", {
    background: "$black800",
    position: "relative",
    display: "grid",
    gap: "$400",
    gridTemplateAreas: `"sidebar main"
                        "playback playback"`,
    gridTemplateColumns: "auto 1fr",
    gridTemplateRows: "1fr auto",
    height: "100%",
    padding: "$400",
});

const Main = styled("main", {
    background: "$black600",
    borderRadius: "8px",
    display: "flex",
    gridArea: "main",
    minHeight: 0,

    // Allows our loading indicator to be centered
    "[data-overlayscrollbars=host]": {
        width: "100%",
    },
});

export default App;
