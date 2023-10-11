import React from "react";
import { Toaster as ToasterInner } from "react-hot-toast";

import { theme } from "../common/theme";

const containerStyle = {
    bottom: theme.sizes.toasterBottom,
};

type ToasterOptions = {
    style: React.CSSProperties;
};

const options: ToasterOptions = {
    style: {
        animation: "none",
        background: theme.colors.info400,
        color: theme.colors.white800,
        fontWeight: 500,
        lineHeight: 1.5,
        padding: `${theme.space["400"]} ${theme.space["800"]}`,
        margin: 0,
    },
};

function Toaster() {
    return <ToasterInner containerStyle={containerStyle} position="bottom-center" toastOptions={options} />;
}

export default Toaster;
