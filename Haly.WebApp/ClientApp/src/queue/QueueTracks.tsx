import { useQuery } from "@tanstack/react-query";
import { LuMenu } from "react-icons/lu";

import { styled } from "../common/theme";
import halyClient from "../halyClient";
import QueueTable from "../table/queue/QueueTable";
import QueueEmptyState from "./QueueEmptyState";

type QueueTracksProps = {
    contextName?: string;
};

function QueueTracks({ contextName }: QueueTracksProps) {
    const query = useQuery(["me", "player", "queue"], () => halyClient.player.getQueue());

    if (!query.data) return null;

    if (query.data.length === 0) {
        return (
            <QueueEmptyState>
                <span aria-hidden>
                    <LuMenu />
                </span>

                <h1>Queue is empty</h1>
                <p>Use the &quot;Add to queue&quot; action from the context menu to see them here.</p>
            </QueueEmptyState>
        );
    }

    return (
        <>
            <h1>Queue</h1>

            <SectionWrapper>
                <h2>Now playing</h2>

                <QueueTable tracks={query.data.slice(0, 1)} indexOffset={1} />
            </SectionWrapper>

            {query.data.length > 1 && (
                <SectionWrapper>
                    {contextName ? <h2>Next from: {contextName}</h2> : <h2>Next</h2>}

                    <QueueTable tracks={query.data.slice(1)} indexOffset={2} />
                </SectionWrapper>
            )}
        </>
    );
}

const SectionWrapper = styled("section", {
    table: {
        padding: "$400 0 $800",
    },
});

export default QueueTracks;
