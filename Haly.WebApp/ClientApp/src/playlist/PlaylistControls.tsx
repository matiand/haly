import SearchBar from "../collections/SearchBar";
import MoreOptionsButton from "../common/MoreOptionsButton";
import { styled } from "../common/theme";
import PlaybackToggle from "../player/PlaybackToggle";

type PlaylistControlsProps = {
    name: string;
};

function PlaylistControls({ name }: PlaylistControlsProps) {
    return (
        <Wrapper>
            <PlaybackToggle size="large" />
            <MoreOptionsButton label={`More options for playlist ${name}`} size="medium" />
            <SearchBar variant="playlist" />
        </Wrapper>
    );
}

const Wrapper = styled("div", {
    alignItems: "center",
    display: "flex",
    padding: "$700 0",

    "> :first-child": {
        marginRight: "$700",
    },

    "> :last-child": {
        marginLeft: "auto",
    },
});

export default PlaylistControls;
