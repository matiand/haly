import { MenuItem } from "@szhsin/react-menu";
import { useState } from "react";

import EditPlaylistDetailsModal from "../../playlist/EditPlaylistDetailsModal";

type EditPlaylistDetailsMenuItemProps = {
    // todo: maybe PlaylistBriefDto
    id: string;
    name: string;
    description: string;
};

// todo: how exactly will you get these props from the sidebar items?
function EditPlaylistDetailsMenuItem({ id, name, description }: EditPlaylistDetailsMenuItemProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const title = "Edit details";

    return (
        <>
            <MenuItem onClick={() => setIsModalOpen(true)}>{title}</MenuItem>

            {isModalOpen && (
                <EditPlaylistDetailsModal
                    id={id}
                    onClose={() => setIsModalOpen(false)}
                    name={name}
                    description={description}
                />
            )}
        </>
    );
}

export default EditPlaylistDetailsMenuItem;
