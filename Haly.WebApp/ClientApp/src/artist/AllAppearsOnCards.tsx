import { useEffect } from "react";
import { useParams } from "react-router-dom";

import ResizableCardGroup from "../common/ResizableCardGroup";
import useAppearsOnQuery, { AppearsOnFilter } from "./useAppearsOnQuery";

function AllAppearsOnCards() {
    const { id: artistId, filter: pathFilter } = useParams();
    const { items, options, filter } = useAppearsOnQuery(artistId!, pathFilter as AppearsOnFilter);

    useEffect(() => {
        const currentHref = window.location.href;
        const currentFilter = currentHref.split("/").at(-1);
        const newHref = currentHref.replace(currentFilter!, filter);

        window.history.replaceState(null, "", newHref);
    }, [filter, pathFilter]);

    return <ResizableCardGroup title="Appears On" items={items} options={options} maxRows={Infinity} href="" />;
}

export default AllAppearsOnCards;
