import { useSetAtom } from "jotai";
import { useEffect } from "react";
import { SiTask } from "react-icons/si";

import { pageContextAtom } from "../common/atoms/pageAtoms";
import EmptyState from "../ui/EmptyState";
import MiniPageHeader from "../ui/MiniPageHeader";
import NewReleases from "./NewReleases";
import useLatestNewReleasesJobQuery from "./useLatestNewReleasesJobQuery";

const title = "New Releases";

function NewReleasesWrapper() {
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

    if (query.isLoading) return null;

    const job = query.data;
    if (!job) return <EmptyState title="Something went wrong" icon={<SiTask />} />;

    return (
        <div>
            <MiniPageHeader title={title} />

            <NewReleases job={job} />
        </div>
    );
}

export default NewReleasesWrapper;
