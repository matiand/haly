import { useAtomValue } from "jotai";
import { LuMenu } from "react-icons/lu";

import { playbackContextNameAtom } from "../common/atoms";
import { styled } from "../common/theme";
import QueueTable from "../table/queue/QueueTable";
import QueueEmptyState from "./QueueEmptyState";
import useQueueQuery from "./useQueueQuery";

function QueueTracks() {
    const query = useQueueQuery();
    const playbackContextName = useAtomValue(playbackContextNameAtom);

    console.log("why rerender", query.isRefetching);

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
                    {playbackContextName ? <h2>Next from: {playbackContextName}</h2> : <h2>Next</h2>}

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
