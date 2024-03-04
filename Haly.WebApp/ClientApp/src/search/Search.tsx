import { useAtom } from "jotai";
import { useSetAtom } from "jotai/index";
import { useEffect } from "react";

import { modalAtom } from "../common/atoms/modalAtoms";
import { pageContextAtom } from "../common/atoms/pageAtoms";
import { searchOptionAtom, searchQueryAtom } from "../common/atoms/searchAtoms";
import { styled } from "../common/theme";
import Button from "../ui/Button";
import MiniPageHeader from "../ui/MiniPageHeader";
import RadioGroup, { Item as RadioGroupItem, Option } from "../ui/RadioGroup";
import LibrarySearchResults from "./LibrarySearchResults";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";

function Search() {
    const [query, setQuery] = useAtom(searchQueryAtom);
    const [option, setOption] = useAtom(searchOptionAtom);
    const setModal = useSetAtom(modalAtom);
    const setPageContext = useSetAtom(pageContextAtom);

    const searchOptions: Option[] = [
        {
            name: "All",
            isDefault: option === "all",
            onSelected: () => {
                setOption("all");
            },
        },
        {
            name: "Albums",
            isDefault: option === "albums",
            onSelected: () => {
                setOption("albums");
            },
        },
        {
            name: "Artists",
            isDefault: option === "artists",
            onSelected: () => {
                setOption("artists");
            },
        },
        {
            name: "Playlists",
            isDefault: option === "playlists",
            onSelected: () => {
                setOption("playlists");
            },
        },

        {
            name: "Songs",
            isDefault: option === "songs",
            onSelected: () => {
                setOption("songs");
            },
        },

        {
            name: "Your Library",
            isDefault: option === "library",
            onSelected: () => {
                setOption("library");
                setQuery("");
            },
        },
    ];

    useEffect(() => {
        setPageContext({
            type: "basic",
            data: {
                id: "search",
                name: "Search",
            },
        });

        return () => setPageContext(null);
    }, [setPageContext]);

    // Focus the search input on mount.
    useEffect(() => {
        const element = document.querySelector("input[name='search']") as HTMLInputElement | null;
        element?.focus();
    }, []);

    const isLibrarySearch = option === "library";
    const onSubmit = isLibrarySearch ? (text: string) => setQuery(text) : undefined;
    const onChange = isLibrarySearch ? undefined : (text: string) => setQuery(text);

    const onHelpBtnClick = () =>
        setModal({
            type: "displaySearchHelp",
            props: { type: isLibrarySearch ? "library" : "spotify" },
        });

    return (
        <Wrapper>
            <MiniPageHeader title="Search" />

            <Controls>
                <FormWrapper>
                    <SearchBar
                        variant={isLibrarySearch ? "library" : "spotify"}
                        onSubmit={onSubmit}
                        onChange={onChange}
                        initialValue={query}
                    />
                    <button type="button" onClick={onHelpBtnClick}>
                        Show help
                    </button>
                </FormWrapper>

                <RadioGroup options={searchOptions} />
            </Controls>

            {isLibrarySearch ? <LibrarySearchResults q={query} /> : <SearchResults q={query} option={option} />}
        </Wrapper>
    );
}

const Wrapper = styled("div", {
    // Target MiniPageHeader and Controls
    "& > div:nth-child(-n + 2)": {
        marginBottom: "$700",
    },

    [`& form ${Button}`]: {
        fontSize: "$200",
        lineHeight: 2,
    },

    [`& ${RadioGroupItem}:first-child`]: {
        padding: "$200 $600",
    },

    [`& ${RadioGroupItem}:last-child`]: {
        border: "1px solid $secondary700",

        "&[data-state=on]": {
            color: "$white800",
            background: "$secondary700",
        },

        "&:hover": {
            background: "$secondary700",
        },

        "&:active": {
            background: "$secondary500",
        },
    },
});

const Controls = styled("div", {
    "& > *": {
        padding: "$500 0 $400",
    },
});

const FormWrapper = styled("div", {
    display: "flex",
    flexFlow: "column",
    gap: "$400",

    "& > button": {
        alignSelf: "flex-start",
        border: "none",
        color: "$white600",
        fontSize: "$200",
        fontWeight: 500,

        "&:hover": {
            color: "$white800",
            cursor: "pointer",
            textDecoration: "underline",
        },

        "&:active": {
            textDecoration: "none",
        },
    },
});

export default Search;
