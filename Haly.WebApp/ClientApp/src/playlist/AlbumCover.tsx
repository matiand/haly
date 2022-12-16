import { MdOutlineMusicNote } from "react-icons/all";

import { AlbumDto } from "../../generated/haly";
import { styled } from "../common/theme";

type AlbumCoverProps = {
    imageUrl: AlbumDto["imageUrl"];
};

function AlbumCover({ imageUrl }: AlbumCoverProps) {
    if (!imageUrl)
        return (
            <EmptyCover aria-hidden="true">
                <MusicNoteIcon />
            </EmptyCover>
        );

    return <TrackCover src={imageUrl} loading="eager" />;
}

const TrackCover = styled("img", {
    height: "40px",
    // todo: why is there a margin here, it shouldn't be here
    marginRight: "$600",
    width: "40px",
});

const EmptyCover = styled("div", {
    alignItems: "center",
    background: "$black500",
    display: "flex",
    height: "40px",
    justifyContent: "center",
    // todo: why is there a margin here, it shouldn't be here
    marginRight: "$600",
    minWidth: "40px",
    width: "40px",
});

const MusicNoteIcon = styled(MdOutlineMusicNote, {
    color: "$white",
});

export default AlbumCover;
