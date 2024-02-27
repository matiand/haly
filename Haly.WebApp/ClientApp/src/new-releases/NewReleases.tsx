import { useSetAtom } from "jotai";
import { useEffect } from "react";

import { pageContextAtom } from "../common/atoms/pageAtoms";
import MiniPageHeader from "../ui/MiniPageHeader";

const title = "New Releases";

function NewReleases() {
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

    return <MiniPageHeader title={title} />;
}

export default NewReleases;
