import { Route, Routes } from "react-router-dom";

import Album from "./album/Album";
import AllAppearsOnCards from "./artist/AllAppearsOnCards";
import AllDiscographyCards from "./artist/AllDiscographyCards";
import Artist from "./artist/Artist";
import { styled, theme } from "./common/theme";
import useLikedSongsManagement from "./common/useLikedSongsManagement";
import useMeQuery from "./common/useMeQuery";
import { useMessageHub } from "./common/useMessageHub";
import DndProvider from "./dnd/DndProvider";
import Home from "./home/Home";
import ModalProvider from "./menus/ModalProvider";
import PlaybackWrapper from "./playback/PlaybackWrapper";
import LikedSongs from "./playlist/LikedSongs";
import PlaylistWrapper from "./playlist/PlaylistWrapper";
import AllMyFollowedArtistCards from "./profile/AllMyFollowedArtistCards";
import AllMyTopArtistCards from "./profile/AllMyTopArtistCards";
import AllUserPlaylistCards from "./profile/AllUserPlaylistCards";
import Me from "./profile/Me";
import Preferences from "./profile/Preferences";
import Profile from "./profile/Profile";
import Queue from "./queue/Queue";
import Search from "./search/Search";
import Sidebar from "./sidebar/Sidebar";
import LoadingIndicator from "./ui/LoadingIndicator";
import { MainScrollArea } from "./ui/ScrollArea";
import SkipToMainContent, { mainContentId } from "./ui/SkipToMainContent";
import Toaster from "./ui/Toaster";
import UpperMenu from "./uppermenu/UpperMenu";

function App() {
    useMessageHub();
    const query = useMeQuery();
    useLikedSongsManagement({ enabled: query.isSuccess });

    if (query.isLoading) return <LoadingIndicator />;

    return (
        <DndProvider>
            <Layout>
                <SkipToMainContent />

                <UpperMenu />
                <Sidebar />

                <Main id={mainContentId}>
                    <MainScrollArea>
                        <MainLayout>
                            <Routes>
                                <Route index element={<Home />} />

                                <Route path="/me" element={<Me />} />
                                <Route path="/me/following/" element={<AllMyFollowedArtistCards />} />
                                <Route path="/me/top/artists" element={<AllMyTopArtistCards />} />

                                <Route path="/playlist/:id" element={<PlaylistWrapper />} />

                                <Route path="/user/:id" element={<Profile />} />
                                <Route path="/user/:id/playlists" element={<AllUserPlaylistCards />} />

                                <Route path="/artist/:id" element={<Artist />} />
                                <Route path="/artist/:id/appears-on/:filter" element={<AllAppearsOnCards />} />
                                <Route path="/artist/:id/discography/:filter" element={<AllDiscographyCards />} />

                                <Route path="/album/:id" element={<Album />} />

                                <Route path="/search" element={<Search />} />

                                <Route path="/collection/tracks" element={<LikedSongs />} />
                                <Route path="/preferences" element={<Preferences />} />
                                <Route path="/queue" element={<Queue />} />
                            </Routes>
                        </MainLayout>
                    </MainScrollArea>
                </Main>

                {/*<PlaybackWrapper />*/}

                <Toaster />
                <ModalProvider />
            </Layout>
        </DndProvider>
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
