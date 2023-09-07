import { useState } from "react";

import { styled, theme } from "../common/theme";
import QueueTabs, { QueueTabsValues } from "./QueueTabs";
import QueueTracks from "./QueueTracks";
import RecentlyPlayedTracks from "./RecentlyPlayedTracks";

type QueueProps = {
    contextName?: string;
};

function Queue({ contextName }: QueueProps) {
    const [activeTab, setActiveTab] = useState<QueueTabsValues>("queue");

    const toggleTab = () => setActiveTab((prev) => (prev === "queue" ? "recent" : "queue"));

    return (
        <Wrapper>
            <QueueTabs tab={activeTab} toggle={toggleTab} />

            {activeTab === "queue" ? <QueueTracks contextName={contextName} /> : <RecentlyPlayedTracks />}
        </Wrapper>
    );
}

const Wrapper = styled("div", {
    marginTop: theme.sizes.upperMenuHeight,

    h1: {
        fontSize: "$500",
        padding: "$400 0 $800",
    },

    h2: {
        color: "$white400",
        fontSize: "$400",
        fontWeight: 700,
    },
});

export default Queue;
