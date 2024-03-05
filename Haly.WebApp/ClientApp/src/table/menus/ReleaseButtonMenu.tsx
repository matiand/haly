import { ReleaseItemDto } from "../../../generated/haly";
import AlbumMenuItems from "../../album/menus/AlbumMenuItems";
import ButtonMenu from "../../menus/ButtonMenu";

type ReleaseButtonMenuProps = {
    release: ReleaseItemDto;
};

function ReleaseButtonMenu({ release }: ReleaseButtonMenuProps) {
    return (
        <ButtonMenu size="small" label={`More options for release ${release.name}`}>
            <AlbumMenuItems album={release} />
        </ButtonMenu>
    );
}

export default ReleaseButtonMenu;
