import { Root, Trigger } from "@radix-ui/react-dropdown-menu";
import { useAtomValue } from "jotai";
import { HiOutlineUser } from "react-icons/hi";
import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router-dom";

import { userAtom } from "../common/atoms";
import { styled } from "../common/theme";
import DropdownMenu from "../ui/menu/DropdownMenu";
import MenuItem from "../ui/menu/MenuItem";
import MenuItemSeparator from "../ui/menu/MenuItemSeparator";
import UserDropdownHeader from "./UserDropdownHeader";

function UserDropdown() {
    const auth = useAuth();
    const user = useAtomValue(userAtom);
    const navigate = useNavigate();

    if (!user) return null;

    return (
        <Root>
            <MenuTrigger title={user.name}>
                <span aria-hidden>
                    <UserIcon />
                </span>
            </MenuTrigger>

            <DropdownMenu collisionPadding={{ right: 25 }}>
                <UserDropdownHeader user={user} />

                <MenuItem name="Profile" onClick={() => navigate("/me")} />
                <MenuItem name="Settings" onClick={() => navigate("/preferences")} />
                <MenuItem name="About Haly" externalHref="https://github.com/matiand/haly" />

                <MenuItemSeparator />

                <MenuItem name="Account" externalHref="https://www.spotify.com/us/account/overview" />
                <MenuItem name="Dashboard" externalHref="https://developer.spotify.com/dashboard" />

                <MenuItemSeparator />

                <MenuItem name="Log out" onClick={() => auth.removeUser()} />
            </DropdownMenu>
        </Root>
    );
}

const MenuTrigger = styled(Trigger, {
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

const UserIcon = styled(HiOutlineUser, {
    height: "20px",
    width: "20px",
});

export default UserDropdown;
