import { FormEvent, useState } from "react";
import { HiOutlineSearch } from "react-icons/all";

import { styled } from "../common/theme";

function SearchBar() {
    const [search, setSearch] = useState("");

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Submitted: ", search);
    };
    return (
        <Form role="search" onSubmit={onSubmit}>
            <SearchIcon aria-hidden="true" />
            <Input
                aria-label="Search Haly"
                type="search"
                autoCapitalize="false"
                autoCorrect="false"
                spellCheck={false}
                placeholder="What do you want to listen to?"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
        </Form>
    );
}

const Form = styled("form", {
    display: "flex",
    position: "relative",
});

const SearchIcon = styled(HiOutlineSearch, {
    color: "$black600",
    display: "block",
    height: "$searchIconSize",
    position: "absolute",
    left: "$500",
    pointerEvents: "none",
    top: "$400",
    width: "$searchIconSize",
});

const Input = styled("input", {
    border: "0",
    borderRadius: "500px",
    fontSize: "$300",
    height: "$searchBarHeight",
    padding: "$300 $600 $300 $900",
    textOverflow: "ellipsis",
    width: "$searchBarWidth",

    "&:focus": {
        outline: "none",
    },
});

export default SearchBar;
