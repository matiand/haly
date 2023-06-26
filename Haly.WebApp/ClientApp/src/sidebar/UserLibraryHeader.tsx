import { HiPlus } from "react-icons/hi2";
import { MdLibraryMusic } from "react-icons/md";

import { styled } from "../common/theme";

function UserLibraryHeader() {
    return (
        <Header>
            <Title>
                <span aria-hidden>
                    <TitleIcon />
                </span>
                <h2>Your Library</h2>
            </Title>

            <AddButton type="button" aria-label="Create playlist" title="Create playlist">
                <span>
                    <AddButtonIcon />
                </span>
            </AddButton>
        </Header>
    );
}

const Header = styled("header", {
    alignItems: "center",
    boxShadow: "0 3px 6px rgba(0,0,0,.5)",
    color: "$grey200",
    display: "flex",
    justifyContent: "space-between",
    padding: "$400 $600",
});

const Title = styled("div", {
    alignItems: "center",
    display: "flex",
    gap: "$400",
    height: "40px",

    "& > h2": {
        fontSize: "$400",
    },
});

const TitleIcon = styled(MdLibraryMusic, {
    height: "24px",
    width: "24px",
});

const AddButton = styled("button", {
    background: "inherit",
    border: 0,
    borderRadius: "50%",
    color: "inherit",
    cursor: "pointer",
    display: "flex",
    padding: "$200",
    transition: "color 0.2s linear",

    "&:hover": {
        background: "$black500",
        color: "$white",
    },

    "&:active": {
        background: "$black800",
        color: "$white",
    },
});

const AddButtonIcon = styled(HiPlus, {
    height: "$navIconSize",
    width: "$navIconSize",
});

export default UserLibraryHeader;
