import { FormEvent, useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";

import { styled } from "../common/theme";

type SearchBarProps = {
    variant: "topbar" | "playlist";
};

function SearchBar({ variant }: SearchBarProps) {
    const [search, setSearch] = useState("");

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Submitted: ", search);
    };
    return (
        <Form variant={variant} role="search" onSubmit={onSubmit}>
            <SearchIcon aria-hidden="true" />
            <Input
                {...inputPropsByVariant[variant]}
                type="search"
                autoCapitalize="false"
                autoCorrect="false"
                spellCheck={false}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
        </Form>
    );
}

const inputPropsByVariant: Record<SearchBarProps["variant"], Record<string, string>> = {
    topbar: {
        placeholder: "What do you want to listen to?",
        "aria-label": "Search Haly",
        variant: "topbar",
    },
    playlist: {
        placeholder: "Search in playlist",
        "aria-label": "Search in playlist",
        variant: "playlist",
    },
};

const Form = styled("form", {
    display: "flex",
    position: "relative",

    variants: {
        variant: {
            topbar: {
                height: "40px",

                "& > input": {
                    borderRadius: "500px",
                    fontSize: "$300",
                    padding: "$300 $600 $300 $900",
                    width: "320px",
                },

                "& > svg": {
                    height: "24px",
                    left: "$500",
                    top: "$400",
                },
            },
            playlist: {
                height: "32px",

                "& > input": {
                    borderRadius: "4px",
                    fontSize: "$200",
                    padding: "$200 $500 $200 $800",
                    width: "220px",
                },
                "& > svg": {
                    // color: "$white",
                    height: "18px",
                    left: "$400",
                    top: "$300",
                },
            },
        },
    },
});

const SearchIcon = styled(HiOutlineSearch, {
    color: "$black600",
    display: "block",
    position: "absolute",
    pointerEvents: "none",
    width: "$searchIconSize",
});

const Input = styled("input", {
    border: "0",
    fontSize: "$300",
    height: "inherit",
    textOverflow: "ellipsis",

    "&:focus": {
        outline: "none",
    },
});

export default SearchBar;
