import { styled } from "../common/theme";

const QueueEmptyState = styled("div", {
    alignItems: "center",
    display: "flex",
    flexFlow: "column nowrap",
    marginTop: "5%",
    gap: "$600",

    h1: {
        fontSize: "$600",
        fontWeight: 700,
    },

    p: {
        color: "$white700",
        fontWeight: 500,
    },

    "& svg": {
        color: "$white700",
        height: "40px",
        width: "40px",
    },
});

export default QueueEmptyState;
