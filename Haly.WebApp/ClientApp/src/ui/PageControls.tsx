import { useSetAtom } from "jotai/index";
import React from "react";

import { selectedTracksAtom } from "../common/atoms/trackAtoms";
import { styled } from "../common/theme";
import { PlaybackToggleStyledClass } from "../playback/PlaybackToggle";

type PageControlsProps = {
    children?: React.ReactNode;
};

function PageControls(props: PageControlsProps) {
    const setSelectedTracks = useSetAtom(selectedTracksAtom);

    return <Wrapper onClick={(e) => e.currentTarget === e.target && setSelectedTracks([])}>{props.children}</Wrapper>;
}

const Wrapper = styled("div", {
    alignItems: "center",
    display: "flex",
    padding: "$700 0",

    "& > *": {
        marginRight: "$700",
    },

    [`& > ${PlaybackToggleStyledClass}`]: {
        marginRight: "$800",
    },

    "& > form": {
        marginLeft: "auto",
        marginRight: "unset",
    },
});

export default PageControls;
