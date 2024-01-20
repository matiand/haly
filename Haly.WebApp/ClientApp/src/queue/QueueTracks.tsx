import { useAtomValue } from "jotai";
import { LuMenu } from "react-icons/lu";

import { playbackContextNameAtom } from "../common/atoms/playbackAtoms";
import { styled } from "../common/theme";
import QueueTable from "../table/queue/QueueTable";
import EmptyState from "../ui/EmptyState";
import useQueueQuery from "./useQueueQuery";

function QueueTracks() {
    const query = useQueueQuery();
    const playbackContextName = useAtomValue(playbackContextNameAtom);

    if (!query.data) return null;

    if (query.data.length === 0) {
        return (
            <EmptyState
                title="Queue is empty"
                description='Use the "Add to queue" action from the context menu to see them here.'
                icon={<LuMenu />}
            />
        );
    }

    return (
        <>
            <h1>Queue</h1>

            <SectionWrapper>
                <h2>Now playing</h2>

                <QueueTable tracks={query.data.slice(0, 1)} positionOffset={1} />
            </SectionWrapper>

            {query.data.length > 1 && (
                <SectionWrapper>
                    {playbackContextName ? <h2>Next from: {playbackContextName}</h2> : <h2>Next</h2>}

                    <QueueTable tracks={query.data.slice(1)} positionOffset={2} />
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
