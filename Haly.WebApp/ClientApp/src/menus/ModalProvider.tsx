import { useAtomValue } from "jotai";

import { modalAtom } from "../common/atoms/modalAtoms";
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
    }

    return null;
}

export default ModalProvider;