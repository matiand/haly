import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { HiOutlineSearch } from "react-icons/hi";
import { useDebounce } from "usehooks-ts";

import { styled } from "../common/theme";

export type SearchBarProps = {
    variant: "spotify" | "library" | "playlist";
    onChange?: (text: string) => void;
};

type Inputs = {
    search: string;
};

function SearchBar({ variant, onChange }: SearchBarProps) {
    const { register, watch } = useForm<Inputs>();
    const inputRef = useRef<HTMLInputElement | null>(null);

    const search = watch("search");
    const debounceSearch = useDebounce(search, 175);

    useEffect(() => {
        if (onChange) {
            onChange(debounceSearch);
        }
    }, [debounceSearch, onChange]);

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

    const { ref: reactHookFormRef, ...rest } = register("search");

    return (
        <Form
            variant={variant}
            role="search"
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck="false"
            onSubmit={(e) => e.preventDefault()}
        >
            <Input
                {...rest}
                {...inputPropsByVariant[variant]}
                ref={(node) => {
                    reactHookFormRef(node);
                    inputRef.current = node;
                }}
                type="search"
                value={search}
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
    spotify: {
        placeholder: "What do you want to play?",
        "aria-label": "Search",
        variant: "spotify",
    },
    library: {
        placeholder: "Search your library",
        "aria-label": "Library search",
        variant: "library",
    },
    playlist: {
        placeholder: "Search in playlist",
        "aria-label": "Playlist search",
        variant: "playlist",
    },
};

const Form = styled("form", {
    variants: {
        variant: {
            spotify: {
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
