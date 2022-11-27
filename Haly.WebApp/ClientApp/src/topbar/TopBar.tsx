import { styled } from "../common/theme";
import HistoryNavigationButtons from "./HistoryNavigationButtons";
import SearchBar from "./SearchBar";
import UserDropdown from "./UserDropdown";

function TopBar() {
    return (
        <Header id="topbar" aria-label="Top bar and user menu">
            <HistoryNavigationButtons />
            <SearchBar variant="topbar" />
            <UserDropdown />
        </Header>
    );
}

const Header = styled("header", {
    alignItems: "center",
    background: "$black800",
    display: "flex",
    gap: "$700",
    height: "$topbarHeight",
    padding: "$600 $800",
});

export default TopBar;
