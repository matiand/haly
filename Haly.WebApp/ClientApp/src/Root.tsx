import { Outlet } from "react-router-dom";

import { styled, theme } from "./common/theme";
import useLikedSongsManagement from "./common/useLikedSongsManagement";
import useMeQuery from "./common/useMeQuery";
import { useMessageHub } from "./common/useMessageHub";
import DndProvider from "./dnd/DndProvider";
import ModalProvider from "./menus/ModalProvider";
import useNewReleasesJobScheduler from "./new-releases/useNewReleasesJobScheduler";
import Sidebar from "./sidebar/Sidebar";
import LoadingIndicator from "./ui/LoadingIndicator";
import { MainScrollArea } from "./ui/ScrollArea";
import SkipToMainContent, { mainContentId } from "./ui/SkipToMainContent";
import Toaster from "./ui/Toaster";
import UpperMenu from "./upper-menu/UpperMenu";

function Root() {
    useMessageHub();
    const query = useMeQuery();
    useLikedSongsManagement({ enabled: query.isSuccess });
    useNewReleasesJobScheduler({ enabled: query.isSuccess });

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
                            <Outlet />
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

export default Root;
