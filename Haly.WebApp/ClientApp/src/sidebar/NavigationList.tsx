import { HiSearch } from "react-icons/hi";
import { HiHome, HiOutlineFire } from "react-icons/hi2";
import { TbShip } from "react-icons/tb";

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
                <NavigationLink title="New Releases" href="/me" icon={<HiOutlineFire />} />
            </li>
            <li>
                <NavigationLink title="Voyages?" href="/me" icon={<TbShip />} />
            </li>
        </List>
    );
}

const List = styled("ul", {
    fontWeight: "bold",
    paddingBottom: "$600",

    "& > :not(li:first-of-type)": {
        color: "$grey200",
        display: "flex",
        fontSize: "$300",
        minHeight: "40px",
        padding: "0 $700",
        transition: "color 0.2s linear",

        "&:hover": {
            color: "$white",
        },
    },
});

export default NavigationList;
