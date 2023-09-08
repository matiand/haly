import React from "react";

import { PlaybackToggleStyledClass } from "../playback/PlaybackToggle";
import { styled } from "../common/theme";

type PageControlsProps = {
    children?: React.ReactNode;
};

function PageControls(props: PageControlsProps) {
    return <Wrapper>{props.children}</Wrapper>;
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
