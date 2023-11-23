import { AlbumBriefDto, AlbumDetailedDto } from "../../../generated/haly";
import ButtonMenu from "../../menus/ButtonMenu";
import AlbumMenuItems from "./AlbumMenuItems";

type AlbumButtonMenuProps = {
    album: AlbumBriefDto | AlbumDetailedDto;
};

function AlbumButtonMenu({ album }: AlbumButtonMenuProps) {
    const label = `More options for album ${album.name}`;

    return (
        <ButtonMenu label={label} size="big">
            <AlbumMenuItems album={album} />
        </ButtonMenu>
    );
}

export default AlbumButtonMenu;
