import { useSetAtom } from "jotai";

import { modalAtom } from "../../common/atoms/modalAtoms";
import { styled } from "../../common/theme";
import Modal from "./Modal";

type DisplaySearchHelpProps = {
    type: "spotify" | "library";
};

// todo: add type prop and show different help for 'your library' mode
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function DisplaySearchHelp({ type }: DisplaySearchHelpProps) {
    const setModal = useSetAtom(modalAtom);
    const onClose = () => setModal(null);

    return (
        <Modal title="Search help" onClose={onClose}>
            <Wrapper>
                <div>
                    <h3>Filters</h3>
                    <FilterEntry>
                        <code>year:</code>
                        <p>Filter by year. You can filter on a single year or a range (e.g. 1955-1960).</p>
                    </FilterEntry>

                    <FilterEntry>
                        <code>album:</code>
                        <p>Filter by album.</p>
                    </FilterEntry>

                    <FilterEntry>
                        <code>artist:</code>
                        <p>Filter by artist.</p>
                    </FilterEntry>

                    <FilterEntry>
                        <code>genre:</code>
                        <p>Filter by genre.</p>
                    </FilterEntry>
                </div>

                <div>
                    <h3>Albums</h3>
                    <OptionEntry>
                        <code>year:</code>
                        <code>artist:</code>
                    </OptionEntry>

                    <h3>Artists</h3>
                    <OptionEntry>
                        <code>year:</code>
                        <code>genre:</code>
                    </OptionEntry>

                    <h3>Playlists</h3>
                    <OptionEntry>
                        <p>No filters are available.</p>
                    </OptionEntry>

                    <h3>Songs</h3>
                    <OptionEntry>
                        <code>year:</code>
                        <code>album:</code>
                        <code>artist:</code>
                        <code>genre:</code>
                    </OptionEntry>
                </div>
            </Wrapper>
        </Modal>
    );
}

const Wrapper = styled("div", {
    display: "flex",
    flexFlow: "column nowrap",
    gap: "$700",
    padding: "$500 0 $400",

    "code, p": {
        fontSize: "$300",
    },

    h3: {
        color: "$black800",
        fontSize: "$400",
        fontWeight: 700,
        marginBlockEnd: "$200",
    },
});

const FilterEntry = styled("div", {
    p: {
        marginInlineStart: "$600",
    },

    "&:not(:last-of-type)": {
        marginBlockEnd: "$400",
    },
});

const OptionEntry = styled("div", {
    color: "$black400",
    display: "flex",
    gap: "$800",

    code: {
        fontWeight: 500,
    },

    "&:not(:last-of-type)": {
        marginBlockEnd: "$500",
    },
});

export default DisplaySearchHelp;
