import { useDroppable } from "@dnd-kit/core";
import clsx from "clsx";
import { HiPlus } from "react-icons/hi2";

import { styled } from "../common/theme";

type CreatePlaylistButtonProps = {
    createPlaylist: () => void;
};

function CreatePlaylistButton({ createPlaylist }: CreatePlaylistButtonProps) {
    const { isOver, setNodeRef } = useDroppable({
        id: "create-playlist-area",
    });

    return (
        <AddButton
            className={clsx({ isOver })}
            ref={setNodeRef}
            onClick={() => createPlaylist()}
            type="button"
            aria-label="Create playlist"
            title="Create playlist"
        >
            <span>
                <AddButtonIcon />
            </span>
        </AddButton>
    );
}

const AddButton = styled("button", {
    background: "inherit",
    border: 0,
    borderRadius: "50%",
    color: "inherit",
    cursor: "pointer",
    display: "flex",
    padding: "$200",
    transition: "color 0.2s linear",

    "&:hover": {
        background: "$black400",
        color: "$white800",
    },

    "&:active": {
        background: "$black800",
        color: "$white800",
    },

    "&.isOver": {
        outline: "2px solid $primary300",
    },
});

const AddButtonIcon = styled(HiPlus, {
    height: "$navIconSize",
    width: "$navIconSize",
});

export default CreatePlaylistButton;
