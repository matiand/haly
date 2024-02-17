import { useState } from "react";

import { styled } from "../common/theme";
import RadioGroup, { Item as RadioGroupItem, Option } from "../ui/RadioGroup";
import SearchBar, { SearchBarProps } from "./SearchBar";

function Search() {
    const [shouldSearchLibrary, setShouldSearchLibrary] = useState(false);

    const searchOptions: Option[] = [
        {
            name: "Artists",
            isDefault: true,
            onSelected: () => {
                setShouldSearchLibrary(false);
            },
        },

        {
            name: "Albums",
            isDefault: false,
            onSelected: () => {
                setShouldSearchLibrary(false);
            },
        },
        {
            name: "Playlists",
            isDefault: false,
            onSelected: () => {
                setShouldSearchLibrary(false);
            },
        },

        {
            name: "Songs",
            isDefault: false,
            onSelected: () => {
                setShouldSearchLibrary(false);
            },
        },

        {
            name: "Your Library",
            isDefault: false,
            onSelected: () => {
                setShouldSearchLibrary(true);
            },
        },
    ];

    const searchVariant: SearchBarProps["variant"] = shouldSearchLibrary ? "library" : "spotify";

    return (
        <Wrapper>
            <h2>Search</h2>
            <SearchBar variant={searchVariant} />
            <RadioGroup options={searchOptions} />

            {/*<div>*/}
            {/*    <pre>Bla bla bla</pre>*/}
            {/*    <pre>Usage: foo bar baz</pre>*/}
            {/*    <pre>Bla bla bla</pre>*/}
            {/*    <pre>Usage: foo bar baz</pre>*/}
            {/*    <pre>Bla bla bla</pre>*/}
            {/*</div>*/}
        </Wrapper>
    );
}

const Wrapper = styled("div", {
    "& > :first-child": {
        marginBottom: "$600",
    },

    "& > * + *": {
        padding: "$500 0",
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

export default Search;
