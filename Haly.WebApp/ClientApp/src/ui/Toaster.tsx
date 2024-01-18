import { Toaster as ToasterInner, ToasterProps } from "react-hot-toast";

import { theme } from "../common/theme";

const containerStyle = {
    bottom: theme.sizes.toasterBottom,
};

const options: ToasterProps["toastOptions"] = {
    className: "toaster",
    style: {
        animation: "none",
        background: theme.colors.white800,
        boxShadow: `0px 4px 12px 0px ${theme.shadows.toast}`,
        color: theme.colors.black800,
        cursor: "default",
        fontWeight: 500,
        lineHeight: 1.5,
        margin: 0,
        padding: `${theme.space["500"]}`,
        textAlign: "center",
        userSelect: "none",

        // Old colors
        // background: theme.colors.info400,
        // color: theme.colors.white800,
    },
};

function Toaster() {
    return <ToasterInner containerStyle={containerStyle} position="bottom-center" toastOptions={options} />;
}

export default Toaster;
