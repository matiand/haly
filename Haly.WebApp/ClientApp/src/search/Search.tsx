import { useState } from "react";

import RadioGroup, { Item as RadioGroupItem, Option } from "../common/RadioGroup";
import { styled } from "../common/theme";
import SearchBar, { SearchBarProps } from "./SearchBar";

function Search() {
    const [shouldSearchLibrary, setShouldSearchLibrary] = useState(false);

    const searchOptions: Option[] = [
        {
            name: "Artists",
            isDefault: true,
            onSelected: () => {
                setShouldSearchLibrary(false);

                return 1;
            },
        },

        {
            name: "Albums",
            isDefault: false,
            onSelected: () => {
                setShouldSearchLibrary(false);

                return 1;
            },
        },
        {
            name: "Playlists",
            isDefault: false,
            onSelected: () => {
                setShouldSearchLibrary(false);

                return 1;
            },
        },

        {
            name: "Songs",
            isDefault: false,
            onSelected: () => {
                setShouldSearchLibrary(false);

                return 1;
            },
        },

        {
            name: "Your Library",
            isDefault: false,
            onSelected: () => {
                setShouldSearchLibrary(true);
                return 1;
            },
        },
    ];

    const searchVariant: SearchBarProps["variant"] = shouldSearchLibrary ? "library" : "spotifyApi";

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
