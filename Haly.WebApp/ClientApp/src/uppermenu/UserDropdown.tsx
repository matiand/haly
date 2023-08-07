import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useAtomValue } from "jotai";
import { HiOutlineUser } from "react-icons/hi";
import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router-dom";

import { userAtom } from "../common/atoms";
import { styled, theme } from "../common/theme";
import ExternalLink from "./ExternalLink";
import UserDropdownHeader from "./UserDropdownHeader";

function UserDropdown() {
    const auth = useAuth();
    const user = useAtomValue(userAtom);
    const navigate = useNavigate();

    if (!user) return null;

    return (
        <DropdownMenu.Root>
            <Trigger title={user.name}>
                <span aria-hidden>
                    <UserIcon />
                </span>
            </Trigger>

            <Content collisionPadding={{ right: 25 }}>
                <UserDropdownHeader user={user} />

                <Item onClick={() => navigate("/me")}>
                    <div>Profile</div>
                </Item>
                <Item onClick={() => navigate("/preferences")}>
                    <div>Settings</div>
                </Item>
                <ExternalLink name="About Haly" href="https://github.com/matiand/haly" />

                <Separator />

                <ExternalLink name="Account" href="https://www.spotify.com/us/account/overview" />
                <ExternalLink name="Dashboard" href="https://developer.spotify.com/dashboard" />

                <Separator />

                <Item css={{ padding: theme.space[500] }} onClick={() => auth.removeUser()}>
                    Log out
                </Item>
            </Content>
        </DropdownMenu.Root>
    );
}

const Trigger = styled(DropdownMenu.Trigger, {
    $$size: "36px",

    alignItems: "center",
    background: "$userDropdownBtnBg",
    border: 0,
    borderRadius: "50%",
    color: "$white800",
    display: "flex",
    flexShrink: 0,
    height: "$$size",
    justifyContent: "center",
    margin: "0 $400 0 auto",
    padding: "$100",
    userSelect: "none",
    width: "$$size",

    '&:hover,  &[data-state="open"]': {
        background: "$userDropdownBtnHover",
        cursor: "pointer",
        transform: "scale(1.04)",
    },
});

const Content = styled(DropdownMenu.Content, {
    background: "$black200",
    borderRadius: "4px",
    fontSize: "$200",
    fontWeight: 500,
    marginTop: "$400",
    padding: "$200",
    userSelect: "none",
    width: "$userDropdownMinWidth",
    zIndex: "$upperMenuContents",

    "& > :first-child, & > [role='menuitem'] > *": {
        padding: "$500",
    },
});

export const Item = styled(DropdownMenu.Item, {
    borderRadius: "2px",
    color: "$userDropdownItemText",
    cursor: "default",

    "&:hover": {
        backgroundColor: "$trackHover",
        outline: 0,
    },

    a: {
        color: "unset",
        cursor: "unset",
        display: "flex",
        justifyContent: "space-between",
        textDecoration: "none",
    },
});

const UserIcon = styled(HiOutlineUser, {
    height: "20px",
    width: "20px",
});

const Separator = styled(DropdownMenu.Separator, {
    height: "1px",
    backgroundColor: "$black100",
});

export default UserDropdown;
