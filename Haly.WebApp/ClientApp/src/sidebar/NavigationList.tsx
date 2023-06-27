import { HiSearch } from "react-icons/hi";
import { HiDocument, HiFire, HiHome } from "react-icons/hi2";

import { styled } from "../common/theme";
import NavigationLink from "./NavigationLink";
import SpotifyBanner from "./SpotifyBanner";

function NavigationList() {
    return (
        <List>
            <li>
                <SpotifyBanner />
            </li>

            <li>
                <NavigationLink title="Home" href="/" icon={<HiHome />} />
            </li>
            <li>
                <NavigationLink title="Search" href="/search" icon={<HiSearch />} />
            </li>
            <li>
                <NavigationLink title="New Releases" href="/me" icon={<HiFire />} />
            </li>
            <li>
                <NavigationLink title="Backlog" href="/bae" icon={<HiDocument />} />
            </li>
        </List>
    );
}

const List = styled("ul", {
    fontWeight: "bold",
    paddingBottom: "$600",

    "& > :not(li:first-of-type)": {
        color: "$white500",
        display: "flex",
        fontSize: "$300",
        minHeight: "40px",
        padding: "0 $700",
        transition: "color 0.2s linear",

        "&:hover": {
            color: "$white800",
        },
    },
});

export default NavigationList;
