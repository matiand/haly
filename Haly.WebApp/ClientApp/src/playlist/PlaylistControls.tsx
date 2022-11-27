import { HiEllipsisHorizontal } from "react-icons/all";

import { styled } from "../common/theme";
import PlaybackToggle from "../player/PlaybackToggle";
import SearchBar from "../topbar/SearchBar";

type PlaylistControlsProps = {
    name: string;
};

function PlaylistControls({ name }: PlaylistControlsProps) {
    return (
        <Wrapper>
            <PlaybackToggle />
            <MoreOptionsBtn type="button" aria-haspopup="menu" aria-label={`More options for playlist ${name}`}>
                <MoreOptionsIcon />
            </MoreOptionsBtn>
            <SearchBar variant="playlist" />
        </Wrapper>
    );
}

const Wrapper = styled("div", {
    alignItems: "center",
    display: "flex",
    height: "$playlistControlsHeight",
    padding: "$600 0",

    "> :first-child": {
        marginRight: "$700",
    },

    "> :last-child": {
        marginLeft: "auto",
    },
});

const PlayBtn = styled("button", {
    marginRight: "$800",
});

const MoreOptionsBtn = styled("button", {
    alignItems: "center",
    background: "transparent",
    border: "0",
    color: "$grey200",
    display: "flex",
    justifyContent: "center",
    padding: "0",

    "&:hover, &:active, &:focus": {
        color: "$white",
    },
});
const MoreOptionsIcon = styled(HiEllipsisHorizontal, {
    height: "40px",
    width: "40px",
});

export default PlaylistControls;
