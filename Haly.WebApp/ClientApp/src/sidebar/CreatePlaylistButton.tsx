import clsx from "clsx";
import { HiPlus } from "react-icons/hi2";

import { styled } from "../common/theme";
import useDroppableArea from "../dnd/useDroppableArea";

type CreatePlaylistButtonProps = {
    createPlaylist: () => void;
};

function CreatePlaylistButton({ createPlaylist }: CreatePlaylistButtonProps) {
    const { droppableRef, classNames: dndClassNames } = useDroppableArea({
        id: "library-plus",
        disabled: false,
    });

    return (
        <AddButton
            ref={droppableRef}
            className={clsx({ ...dndClassNames })}
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
});

const AddButtonIcon = styled(HiPlus, {
    height: "$navIconSize",
    width: "$navIconSize",
});

export default CreatePlaylistButton;
