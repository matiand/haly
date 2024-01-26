import { HiSearch } from "react-icons/hi";
import { HiDocument, HiFire, HiHome } from "react-icons/hi2";

import { styled, theme } from "../common/theme";
import { dndClassNames } from "../dnd/dndStyles";
import NavigationListItem from "./NavigationListItem";
import SpotifyBanner from "./SpotifyBanner";

function NavigationList() {
    return (
        <List>
            <li>
                <SpotifyBanner />
            </li>

            <NavigationListItem title="Home" href="/" icon={<HiHome />} />
            <NavigationListItem title="Search" href="/search" icon={<HiSearch />} />
            <NavigationListItem title="New Releases" href="/me" icon={<HiFire />} />
            <NavigationListItem title="Backlog" href="/bae" icon={<HiDocument />} areaId="backlog" />
        </List>
    );
}

const List = styled("ul", {
    $$itemColor: theme.colors.white500,

    fontWeight: "bold",
    paddingBottom: "$600",

    "& > :not(li:first-of-type)": {
        color: "$$itemColor",
        display: "flex",
        fontSize: "$300",
        minHeight: "40px",
        padding: "0 $600",
        transition: "color 0.2s linear",

        "&:hover": {
            color: "$white800",
        },
    },

    [`.${dndClassNames.draggingInProgress} & > li:hover`]: {
        color: "$$itemColor",
    },
});

export default NavigationList;
