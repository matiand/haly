import { LuMusic3 } from "react-icons/lu";

import { styled } from "../common/theme";

function NoLikedSongs() {
    return (
        <Wrapper>
            <span aria-hidden>
                <LuMusic3 />
            </span>
            <h2>Songs you like will appear here</h2>

            <p>Save songs by tapping the heart icon.</p>
        </Wrapper>
    );
}

const Wrapper = styled("div", {
    alignItems: "center",
    display: "flex",
    flexFlow: "column nowrap",
    marginTop: "72px",

    "span, svg": {
        height: "40px",
        width: "40px",
    },

    h2: {
        margin: "$600 0",
    },

    p: {
        fontSize: "$300",
        fontWeight: 500,
    },
});

export default NoLikedSongs;
