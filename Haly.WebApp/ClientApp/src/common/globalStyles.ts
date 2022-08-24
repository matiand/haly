import "modern-css-reset";
import "@fontsource/plus-jakarta-sans/400.css";
import "@fontsource/plus-jakarta-sans/500.css";
import "@fontsource/plus-jakarta-sans/200.css";
import "@fontsource/plus-jakarta-sans/700.css";

import { globalCss } from "./theme";

const globalStyles = globalCss({
    "html, body, #root": {
        height: "100%",
        overscrollBehaviorY: "none",
        minHeight: "unset",
    },

    body: {
        fontFamily: "$primary",
        "-webkit-font-smoothing": "antialiased",
        "-moz-osx-font-smoothing": "grayscale",
    },

    ".hiddenVisually": {
        clip: "rect(0 0 0 0)",
        clipPath: "inset(50%)",
        height: "1px",
        width: "1px",
        overflow: "hidden",
        position: "absolute",
        whiteSpace: "nowrap",
    },
});

globalStyles();
