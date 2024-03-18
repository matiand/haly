import { createBrowserRouter } from "react-router-dom";

import Album from "./album/Album";
import AllAppearsOnCards from "./artist/AllAppearsOnCards";
import AllDiscographyCards from "./artist/AllDiscographyCards";
import Artist from "./artist/Artist";
import Home from "./home/Home";
import NewReleasesWrapper from "./new-releases/NewReleasesWrapper";
import LikedSongs from "./playlist/LikedSongs";
import PlaylistWrapper from "./playlist/PlaylistWrapper";
import AllMyFollowedArtistCards from "./profile/AllMyFollowedArtistCards";
import AllMyTopArtistCards from "./profile/AllMyTopArtistCards";
import AllUserPlaylistCards from "./profile/AllUserPlaylistCards";
import Me from "./profile/Me";
import Preferences from "./profile/Preferences";
import Profile from "./profile/Profile";
import Queue from "./queue/Queue";
import Root from "./Root";
import Search from "./search/Search";
import NotFound from "./ui/NotFound";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "/me",
                element: <Me />,
            },
            {
                path: "/me/new-releases",
                element: <NewReleasesWrapper />,
            },
            {
                path: "/me/following",
                element: <AllMyFollowedArtistCards />,
            },
            {
                path: "/me/top/artists",
                element: <AllMyTopArtistCards />,
            },
            {
                path: "/collection/tracks",
                element: <LikedSongs />,
            },
            {
                path: "/playlist/:id",
                element: <PlaylistWrapper />,
            },
            {
                path: "/user/:id",
                element: <Profile />,
            },
            {
                path: "/user/:id/playlists",
                element: <AllUserPlaylistCards />,
            },
            {
                path: "/album/:id",
                element: <Album />,
            },
            {
                path: "/artist/:id",
                element: <Artist />,
            },
            {
                path: "/artist/:id/appears-on/:filter",
                element: <AllAppearsOnCards />,
            },
            {
                path: "/artist/:id/discography/:filter",
                element: <AllDiscographyCards />,
            },
            {
                path: "/search",
                element: <Search />,
            },
            {
                path: "/preferences",
                element: <Preferences />,
            },
            {
                path: "/queue",
                element: <Queue />,
            },
            {
                path: "*",
                element: <NotFound />,
            },
        ],
    },
]);

export default router;
