import { LuHistory } from "react-icons/lu";

import { styled } from "../common/theme";
import ReadOnlyTable from "../table/readonly/ReadOnlyTable";
import EmptyState from "../ui/EmptyState";
import useRecentlyPlayedQuery from "./useRecentlyPlayedQuery";

function RecentlyPlayedTracks() {
    const query = useRecentlyPlayedQuery();

    if (!query.data) return null;

    if (query.data.length === 0) {
        return <EmptyState title="History is empty" icon={<LuHistory />} />;
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
