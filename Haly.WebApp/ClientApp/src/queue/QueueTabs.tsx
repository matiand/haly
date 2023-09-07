import clsx from "clsx";

import { styled } from "../common/theme";

export type QueueTabsValues = "queue" | "recent";

type QueueTabsProps = {
    tab: QueueTabsValues;
    toggle: () => void;
};

function QueueTabs({ tab, toggle }: QueueTabsProps) {
    return (
        <Wrapper>
            <button
                className={clsx({ active: tab === "queue" })}
                type="button"
                onClick={() => tab === "recent" && toggle()}
            >
                Queue
            </button>

            <button
                className={clsx({ active: tab === "recent" })}
                type="button"
                onClick={() => tab === "queue" && toggle()}
            >
                Recently played
            </button>
        </Wrapper>
    );
}

const Wrapper = styled("div", {
    display: "flex",
    gap: "$400",
    position: "absolute",
    top: "-48px",

    "& > button": {
        color: "$white",
        cursor: "pointer",
        background: "transparent",
        border: "none",
        borderRadius: "4px",
        fontWeight: 700,
        fontSize: "$350",
        padding: "$500 $600",

        "&.active": {
            background: "$black200",
        },
    },
});

export default QueueTabs;
