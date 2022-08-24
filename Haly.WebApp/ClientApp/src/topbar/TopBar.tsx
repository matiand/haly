import { styled } from "../common/theme";
import UserDropdown from "./UserDropdown";

function TopBar() {
    return (
        <Header aria-label="Top bar and user menu">
            <UserDropdown />
        </Header>
    );
}

const Header = styled("header", {
    height: "$topbarHeight",
});

export default TopBar;
