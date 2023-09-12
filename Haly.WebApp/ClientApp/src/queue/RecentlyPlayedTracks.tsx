import { LuHistory } from "react-icons/lu";

import { styled } from "../common/theme";
import ReadOnlyTable from "../table/readonly/ReadOnlyTable";
import QueueEmptyState from "./QueueEmptyState";
import useRecentlyPlayedQuery from "./useRecentlyPlayedQuery";

function RecentlyPlayedTracks() {
    const query = useRecentlyPlayedQuery();

    if (!query.data) return null;

    if (query.data.length === 0) {
        return (
            <QueueEmptyState>
                <span aria-hidden>
                    <LuHistory />
                </span>

                <h1>History is empty</h1>
            </QueueEmptyState>
        );
    }

    return (
        <Section>
            <h1>Recently played</h1>

            <ReadOnlyTable tracks={query.data} />
        </Section>
    );
}

const Section = styled("section", {
    h1: {
        padding: "$400 0 $800",
    },
});

export default RecentlyPlayedTracks;
