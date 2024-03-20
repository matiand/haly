import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { HiOutlineSearch } from "react-icons/hi";

import { styled } from "../common/theme";
import useDebounce from "../common/useDebounce";
import Button from "../ui/Button";

type SearchBarProps = {
    variant: "spotify" | "library" | "playlist";
    onChange?: (text: string) => void;
    onSubmit?: (text: string) => void;
    initialValue?: string;
};

type Inputs = {
    search: string;
};

function SearchBar({ variant, onChange, onSubmit, initialValue }: SearchBarProps) {
    const { register, watch, handleSubmit } = useForm<Inputs>({ defaultValues: { search: initialValue } });
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
            role="search"
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck="false"
            onSubmit={handleSubmit((data) => onSubmit && onSubmit(data.search))}
        >
            <InputWrapper variant={variant}>
                <Input
                    {...rest}
                    {...inputPropsByVariant[variant]}
                    ref={(node) => {
                        reactHookFormRef(node);
                        inputRef.current = node;
                    }}
                    type="search"
                />

                <div>
                    <span aria-hidden>
                        <SearchIcon />
                    </span>
                </div>
            </InputWrapper>

            {variant === "library" && (
                <Button variant="square" type="submit">
                    Submit
                </Button>
            )}
        </Form>
    );
}

const inputPropsByVariant: Record<SearchBarProps["variant"], Record<string, string>> = {
    spotify: {
        placeholder: "Search Spotify's catalog",
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
    display: "flex",
    flexFlow: "row wrap",
    gap: "$800",
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

const InputWrapper = styled("div", {
    variants: {
        variant: {
            spotify: {
                $$iconWidth: "24px",

                [`& ${Input}`]: {
                    padding: "$300 $600 $300 calc($$iconWidth * 2)",
                    width: "360px",
                },
            },
            library: {
                $$iconWidth: "24px",

                [`& ${Input}`]: {
                    padding: "$300 $600 $300 calc($$iconWidth * 2)",
                    width: "580px",
                },
            },
            playlist: {
                $$iconWidth: "18px",

                [`& ${Input}`]: {
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

export default SearchBar;
