import { useQuery } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import { useAuth } from "react-oidc-context";
import { Route, Routes } from "react-router-dom";

import Album from "./album/Album";
import Artist from "./artist/Artist";
import LikedSongs from "./collections/LikedSongs";
import { AllMyFollowedArtistCards, AllMyTopArtistCards, AllUserPlaylistCards } from "./common/AllCards";
import { userAtom } from "./common/atoms";
import LoadingIndicator from "./common/LoadingIndicator";
import ScrollArea from "./common/ScrollArea";
import { styled } from "./common/theme";
import Toaster from "./common/Toaster";
import { useMessageHub } from "./common/useMessageHub";
import halyClient from "./halyClient";
import Home from "./home/Home";
import Me from "./me/Me";
import Preferences from "./me/Preferences";
import Playback from "./playback/Playback";
import Playlist from "./playlist/Playlist";
import Profile from "./profile/Profile";
import Sidebar from "./sidebar/Sidebar";
import UpperMenu from "./uppermenu/UpperMenu";

function App() {
    const auth = useAuth();
    const setUser = useSetAtom(userAtom);
    const accessToken = auth.user!.access_token;
    useMessageHub();

    const { isLoading } = useQuery(
        ["me"],
        () => halyClient.me.putCurrentUser({ body: accessToken }).then((user) => setUser(user)),
        { refetchOnWindowFocus: "always" },
    );

    if (isLoading) return <LoadingIndicator />;

    return (
        <Layout>
            <UpperMenu />
            <Sidebar />

            <Main>
                <ScrollArea>
                    <Routes>
                        <Route index element={<Home />} />

                        <Route path="/me" element={<Me />} />
                        <Route path="/me/following/" element={<AllMyFollowedArtistCards />} />
                        <Route path="/me/top/artists" element={<AllMyTopArtistCards />} />

                        <Route path="/playlist/:id" element={<Playlist />} />

                        <Route path="/user/:id" element={<Profile />} />
                        <Route path="/user/:id/playlists" element={<AllUserPlaylistCards />} />

                        <Route path="/artist/:id" element={<Artist />} />
                        <Route path="/album/:id" element={<Album />} />

                        <Route path="/collection/tracks" element={<LikedSongs />} />
                        <Route path="/preferences" element={<Preferences />} />
                    </Routes>
                </ScrollArea>
            </Main>

            <Playback />
            <Toaster />
        </Layout>
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
});

export default App;
