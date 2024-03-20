import { useAtomValue } from "jotai/index";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { lastVisitedArtistNameAtom } from "../common/atoms/pageAtoms";
import useDocumentTitle from "../common/useDocumentTitle";
import ResizableCardGroup from "../ui/card/ResizableCardGroup";
import useAppearsOnQuery, { AppearsOnFilter } from "./useAppearsOnQuery";

function AllAppearsOnCards() {
    const { id: artistId, filter: pathFilter } = useParams();
    const { items, options, filter } = useAppearsOnQuery(artistId!, pathFilter as AppearsOnFilter);

    const lastVisitedArtistName = useAtomValue(lastVisitedArtistNameAtom);
    useDocumentTitle(lastVisitedArtistName ? `${lastVisitedArtistName} - Appears On` : "Appears On");

    useEffect(() => {
        const currentHref = window.location.href;
        const currentFilter = currentHref.split("/").at(-1);
        const newHref = currentHref.replace(currentFilter!, filter);

        window.history.replaceState(null, "", newHref);
    }, [filter, pathFilter]);

    return <ResizableCardGroup title="Appears On" items={items} options={options} maxRows={Infinity} href="" />;
}

export default AllAppearsOnCards;
