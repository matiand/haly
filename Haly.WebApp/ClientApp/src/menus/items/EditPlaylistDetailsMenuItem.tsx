import { MenuItem } from "@szhsin/react-menu";
import { useSetAtom } from "jotai";

import modalAtom from "../modals/modalAtom";

type EditPlaylistDetailsMenuItemProps = {
    id: string;
    name: string;
    description: string;
};

// todo: how exactly will you get these props from the sidebar items?
function EditPlaylistDetailsMenuItem({ id, name, description }: EditPlaylistDetailsMenuItemProps) {
    const setModal = useSetAtom(modalAtom);
    const title = "Edit details";

    const onClick = () => {
        setModal({
            type: "editPlaylistDetails",
            props: {
                id,
                name,
                description,
            },
        });
    };

    return <MenuItem onClick={onClick}>{title}</MenuItem>;
}

export default EditPlaylistDetailsMenuItem;
