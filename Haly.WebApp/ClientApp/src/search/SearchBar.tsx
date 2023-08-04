import { ChangeEventHandler, useEffect, useRef, useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { useDebounce } from "usehooks-ts";

import { styled } from "../common/theme";

export type SearchBarProps = {
    variant: "spotifyApi" | "library" | "playlist";
    onChange?: (text: string) => void;
};

function SearchBar({ variant, onChange }: SearchBarProps) {
    const [search, setSearch] = useState("");
    const debouncedValue = useDebounce(search, 175);
    const inputRef = useRef<HTMLInputElement>(null);

    const onInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        const text = e.target.value;
        setSearch(text);
    };

    useEffect(() => {
        if (onChange) {
            onChange(debouncedValue);
        }
    }, [debouncedValue, onChange]);

    useEffect(() => {
        const keyHandler = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.key === "f" && variant === "playlist") {
                e.preventDefault();
                inputRef.current?.focus();
            }
        };

        window.addEventListener("keydown", keyHandler);

        return () => window.removeEventListener("keydown", keyHandler);
    }, [variant]);

    return (
        <Form variant={variant} role="search" onSubmit={(e) => e.preventDefault()}>
            <Input
                {...inputPropsByVariant[variant]}
                ref={inputRef}
                type="search"
                autoCapitalize="false"
                autoCorrect="false"
                spellCheck={false}
                value={search}
                onChange={onInputChange}
            />

            <div>
                <span aria-hidden>
                    <SearchIcon />
                </span>
            </div>
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
                    padding: "$300 $600 $300 calc($$iconWidth * 2)",
                    width: "360px",
                },
            },
            library: {
                $$iconWidth: "24px",

                "& > input": {
                    padding: "$300 $600 $300 calc($$iconWidth * 2)",
                    width: "500px",
                },
            },
            playlist: {
                $$iconWidth: "18px",

                "& > input": {
                    background: "$playlistSearchBg",
                    fontSize: "$200",
                    padding: "$200 $500 $200 calc($$iconWidth * 2)",
                    width: "220px",

                    "&:hover": {
                        background: "$playlistSearchBg",
                    },
                },
            },
        },
    },

    alignItems: "center",
    display: "flex",
    position: "relative",

    "& > input": {
        height: "calc($$iconWidth * 2)",

        transition: "width 0.3s ease-in",
    },

    "& > div": {
        left: "calc($$iconWidth * 0.5)",
        position: "absolute",
        zIndex: 1,

        svg: {
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
    fontWeight: 500,
    height: "inherit",
    textOverflow: "ellipsis",

    "&:hover": {
        background: "$black200",
    },

    "&:focus": {
        outline: "1px solid $white800",
    },

    "&::placeholder": {
        color: "$white600",
    },
});

export default SearchBar;
