import { useAtomValue } from "jotai";

import { modalAtom } from "../common/atoms/modalAtoms";
import DisplayAlbumArtworkModal from "./modals/DisplayAlbumArtworkModal";
import DisplaySearchHelp from "./modals/DisplaySearchHelp";
import DuplicateTracksProblemModal from "./modals/DuplicateTracksProblemModal";
import EditPlaylistDetailsModal from "./modals/EditPlaylistDetailsModal";
import RemoveFromLibraryModal from "./modals/RemoveFromLibraryModal";

function ModalProvider() {
    const variant = useAtomValue(modalAtom);

    if (variant?.type === "removeFromLibrary") {
        return <RemoveFromLibraryModal {...variant.props} />;
    } else if (variant?.type === "editPlaylistDetails") {
        return <EditPlaylistDetailsModal {...variant.props} />;
    } else if (variant?.type === "duplicateTracksProblem") {
        return <DuplicateTracksProblemModal {...variant.props} />;
    } else if (variant?.type === "displayAlbumArtwork") {
        return <DisplayAlbumArtworkModal {...variant.props} />;
    } else if (variant?.type === "displaySearchHelp") {
        return <DisplaySearchHelp {...variant.props} />;
    }

    return null;
}

export default ModalProvider;
