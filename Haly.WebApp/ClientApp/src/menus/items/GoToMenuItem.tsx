import { MenuItem, SubMenu } from "@szhsin/react-menu";
import { useNavigate } from "react-router-dom";

import { AlbumBriefDto, ArtistBriefDto } from "../../../generated/haly";

type GoToMenuItemProps = {
    album?: AlbumBriefDto;
    artists?: ArtistBriefDto[];
};

function GoToMenuItem({ album, artists }: GoToMenuItemProps) {
    const navigate = useNavigate();

    if (album) {
        const href = `/album/${album.id}`;
        return <MenuItem onClick={() => navigate(href)}>Go to album</MenuItem>;
    }

    if (artists) {
        return artists.length > 1 ? (
            <SubMenu label="Go to artist">
                {artists.map((a) => (
                    <MenuItem key={a.id} onClick={() => navigate(`/artist/${a.id}`)}>
                        {a.name}
                    </MenuItem>
                ))}
            </SubMenu>
        ) : (
            <MenuItem onClick={() => navigate(`/artist/${artists[0].id}`)}>Go to artist</MenuItem>
        );
    }

    return null;
}

export default GoToMenuItem;
