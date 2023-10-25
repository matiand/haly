import { MenuItem } from "@szhsin/react-menu";
import { useNavigate } from "react-router-dom";

type GoToMenuItemProps = {
    albumId?: string;
    artistId?: string;
};

function GoToMenuItem({ albumId, artistId }: GoToMenuItemProps) {
    const navigate = useNavigate();

    if (albumId) {
        const href = `/album/${albumId}`;
        return <MenuItem onClick={() => navigate(href)}>Go to album</MenuItem>;
    }

    if (artistId) {
        const href = `/artist/${artistId}`;
        return <MenuItem onClick={() => navigate(href)}>Go to artist</MenuItem>;
    }

    return null;
}

export default GoToMenuItem;
