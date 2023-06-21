import "modern-css-reset";
import "overlayscrollbars/overlayscrollbars.css";
import "@fontsource/plus-jakarta-sans/200.css";
import "@fontsource/plus-jakarta-sans/400.css";
import "@fontsource/plus-jakarta-sans/500.css";
import "@fontsource/plus-jakarta-sans/700.css";
import "@fontsource/plus-jakarta-sans/800.css";

import { globalCss } from "./theme";

const globalStyles = globalCss({
    "html, body, #root": {
        height: "100%",
        overscrollBehaviorY: "none",
        minHeight: "unset",
    },

    body: {
        color: "$white",
        fontFamily: "$primary",
        lineHeight: 1.6,
        "-webkit-font-smoothing": "antialiased",
        "-moz-osx-font-smoothing": "grayscale",
    },

    ul: {
        listStyle: "none",
        margin: 0,
        padding: 0,
    },

    "span, svg": {
        display: "block",
    },

    ".hidden-visually": {
        clip: "rect(0 0 0 0)",
        clipPath: "inset(50%)",
        height: "1px",
        width: "1px",
        overflow: "hidden",
        position: "absolute",
        whiteSpace: "nowrap",
    },

    ".truncate": {
        "-webkit-line-clamp": 1,
        "-webkit-box-orient": "vertical",
        display: "-webkit-box",
        overflow: "hidden",
    },

    // Used to position react query devtools toggle btn
    ".rq-toggle": {
        right: "210px !important",
    },

    "a, button": {
        touchAction: "manipulation",
    },
});

globalStyles();
