import { useSetAtom } from "jotai";
import { useEffect } from "react";

import { pageContextAtom } from "../common/atoms/pageAtoms";
import useDocumentTitle from "../common/useDocumentTitle";
import MiniPageHeader from "../ui/MiniPageHeader";
import NewReleases from "./NewReleases";
import NewReleasesDescription from "./NewReleasesDescription";
import useLatestNewReleasesJobQuery from "./useLatestNewReleasesJobQuery";

const title = "New Releases";

function NewReleasesWrapper() {
    useDocumentTitle("New Releases");

    const query = useLatestNewReleasesJobQuery();

    const setPageContext = useSetAtom(pageContextAtom);
    useEffect(() => {
        setPageContext({
            type: "basic",
            data: {
                id: "new-releases",
                name: title,
            },
        });

        return () => setPageContext(null);
    }, [setPageContext]);

    if (!query.data) return null;

    const job = query.data;

    return (
        <div>
            <MiniPageHeader title={title} />
            <NewReleasesDescription key={Date.now()} jobFinishedAt={job.finishedAt} />

            <NewReleases job={job} />
        </div>
    );
}

export default NewReleasesWrapper;
