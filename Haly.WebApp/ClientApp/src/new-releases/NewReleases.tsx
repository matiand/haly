import { useSetAtom } from "jotai";
import { useEffect } from "react";

import { pageContextAtom } from "../common/atoms/pageAtoms";
import { styled } from "../common/theme";
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

    return (
        <Wrapper>
            <MiniPageHeader title={title} />
            <p>The latest songs from artists that you follow.</p>
        </Wrapper>
    );
}

const Wrapper = styled("div", {
    p: {
        color: "$white400",
        fontSize: "$100",
        fontWeight: 500,
        userSelect: "none",
    },
});

export default NewReleases;
