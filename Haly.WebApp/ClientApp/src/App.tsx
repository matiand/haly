import { useQuery } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import { useAuth } from "react-oidc-context";
import { Route, Routes } from "react-router-dom";

import Album from "./album/Album";
import AllAppearsOnCards from "./artist/AllAppearsOnCards";
import AllDiscographyCards from "./artist/AllDiscographyCards";
import Artist from "./artist/Artist";
import LikedSongs from "./collections/LikedSongs";
import { userAtom } from "./common/atoms";
import LoadingIndicator from "./common/LoadingIndicator";
import { MainScrollArea } from "./common/ScrollArea";
import { styled, theme } from "./common/theme";
import Toaster from "./common/Toaster";
import { useMessageHub } from "./common/useMessageHub";
import halyClient from "./halyClient";
import Home from "./home/Home";
import Playback from "./playback/Playback";
import Playlist from "./playlist/Playlist";
import AllMyFollowedArtistCards from "./profile/AllMyFollowedArtistCards";
import AllMyTopArtistCards from "./profile/AllMyTopArtistCards";
import AllUserPlaylistCards from "./profile/AllUserPlaylistCards";
import Me from "./profile/Me";
import Preferences from "./profile/Preferences";
import Profile from "./profile/Profile";
import Search from "./search/Search";
import Sidebar from "./sidebar/Sidebar";
import UpperMenu from "./uppermenu/UpperMenu";

function App() {
    const auth = useAuth();
    const setUser = useSetAtom(userAtom);
    const accessToken = auth.user!.access_token;
    useMessageHub();

    const { isLoading } = useQuery(
        ["me"],
        () =>
            halyClient.me.putCurrentUser({ body: accessToken }).then((user) => {
                setUser(user);
                return user;
            }),
        { refetchOnWindowFocus: "always" },
    );

    if (isLoading) return <LoadingIndicator />;

    return (
        <Layout>
            <UpperMenu />
            <Sidebar />

            <Main>
                <MainScrollArea>
                    <MainLayout>
                        <Routes>
                            <Route index element={<Home />} />

                            <Route path="/me" element={<Me />} />
                            <Route path="/me/following/" element={<AllMyFollowedArtistCards />} />
                            <Route path="/me/top/artists" element={<AllMyTopArtistCards />} />

                            <Route path="/playlist/:id" element={<Playlist />} />

                            <Route path="/user/:id" element={<Profile />} />
                            <Route path="/user/:id/playlists" element={<AllUserPlaylistCards />} />

                            <Route path="/artist/:id" element={<Artist />} />
                            <Route path="/artist/:id/appears-on/:filter" element={<AllAppearsOnCards />} />
                            <Route path="/artist/:id/discography/:filter" element={<AllDiscographyCards />} />

                            <Route path="/album/:id" element={<Album />} />

                            <Route path="/search" element={<Search />} />

                            <Route path="/collection/tracks" element={<LikedSongs />} />
                            <Route path="/preferences" element={<Preferences />} />
                        </Routes>
                    </MainLayout>
                </MainScrollArea>
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

const MainLayout = styled("div", {
    "& > div:first-child": {
        padding: "$800 $700",
        position: "relative",
    },

    "& > section:first-child": {
        $$topMargin: theme.sizes.upperMenuHeight,

        marginTop: "$$topMargin",
        padding: "0 $700 $800",
    },
});

export default App;
