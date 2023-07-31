import { FormEvent, useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";

import { styled } from "../common/theme";

export type SearchBarProps = {
    variant: "spotifyApi" | "library" | "playlist";
};

function SearchBar({ variant }: SearchBarProps) {
    const [search, setSearch] = useState("");

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Submitted: ", search);
    };
    return (
        <Form variant={variant} role="search" onSubmit={onSubmit}>
            <span aria-hidden>
                <SearchIcon />
            </span>

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
    spotifyApi: {
        placeholder: "What do you want to listen to?",
        "aria-label": "Search Haly",
        variant: "spotifyApi",
    },
    library: {
        placeholder: "Search your library",
        "aria-label": "Search Your Library",
        variant: "library",
    },
    playlist: {
        placeholder: "Search in playlist",
        "aria-label": "Search in playlist",
        variant: "playlist",
    },
};

const Form = styled("form", {
    variants: {
        variant: {
            spotifyApi: {
                $$iconWidth: "24px",

                "& > input": {
                    fontSize: "$300",
                    padding: "$300 $600 $300 calc($$iconWidth * 2)",
                    position: "relative",
                    width: "360px",
                },
            },
            library: {
                $$iconWidth: "24px",
                
                "& > input": {
                    fontSize: "$300",
                    padding: "$300 $600 $300 calc($$iconWidth * 2)",
                    position: "relative",
                    width: "500px",
                },
            },
            playlist: {
                $$iconWidth: "18px",

                "& > input": {
                    fontSize: "$200",
                    padding: "$200 $500 $200 calc($$iconWidth * 2)",
                    position: "relative",
                    width: "220px",
                },
            },
        },
    },

    alignItems: "center",
    display: "flex",
    position: "relative",

    "& > input": {
        height: "calc($$iconWidth * 2)",
        left: "calc($$iconWidth * -2)",

        transition: "width 0.3s ease-in",
    },

    "& > span": {
        zIndex: 1,
        padding: "0 calc($$iconWidth * 0.5)",

        "& > svg": {
            height: "$$iconWidth",
            width: "$$iconWidth",
        },
    },
});

const SearchIcon = styled(HiOutlineSearch, {
    color: "$white600",
    pointerEvents: "none",
});

const Input = styled("input", {
    background: "$black300",
    border: "none",
    borderRadius: "4px",
    color: "$white800",
    fontSize: "$300",
    height: "inherit",
    textOverflow: "ellipsis",

    "&:hover": {
        background: "$black200",
    },

    "&:focus": {
        outline: "1px solid $white800",
    },
});

export default SearchBar;
