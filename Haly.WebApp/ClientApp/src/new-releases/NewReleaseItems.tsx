import React from "react";
import isDeepEqual from "react-fast-compare";
import { SiTask } from "react-icons/si";

import { ReleaseItemDto } from "../../generated/haly";
import ReleasesTable from "../table/releases/ReleasesTable";
import EmptyState from "../ui/EmptyState";

type NewReleaseItemsProps = {
    items: ReleaseItemDto[];
    artistsLeft: number;
};

function NewReleaseItems({ items, artistsLeft }: NewReleaseItemsProps) {
    if (artistsLeft > 0) {
        return (
            <EmptyState
                title="Collecting new releases"
                description={`This can take a while. Artists left: ${artistsLeft}`}
                icon={<SiTask />}
            />
        );
    }

    if (items.length === 0) {
        return (
            <EmptyState
                title="No new releases found"
                description="Follow more artists the see their releases here."
                icon={<SiTask />}
            />
        );
    }

    return <ReleasesTable items={items} />;
}

export default React.memo(NewReleaseItems, isDeepEqual);
