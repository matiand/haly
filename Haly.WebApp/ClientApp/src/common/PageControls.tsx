import React from "react";

import { styled } from "./theme";

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

    "& > :first-child": {
        marginRight: "$700",
    },

    "& > form": {
        marginLeft: "auto",
    },
});

export default PageControls;
