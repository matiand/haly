import { useQueryClient } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { HiOutlineUser } from "react-icons/hi";
import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router-dom";

import { userAtom } from "../common/atoms/userAtoms";
import { styled } from "../common/theme";
import * as DropdownMenu from "../ui/DropdownMenu";
import UserDropdownMenuHeader from "./UserDropdownMenuHeader";

function UserDropdownMenu() {
    const auth = useAuth();
    const queryClient = useQueryClient();
    const user = useAtomValue(userAtom);
    const navigate = useNavigate();

    if (!user) return null;

    const onLogout = () => {
        auth.removeUser();
        navigate("/");
        queryClient.clear();
    };

    return (
        <DropdownMenu.Root>
            <MenuTrigger title={user.name}>
                <span aria-hidden>
                    <UserIcon />
                </span>
            </MenuTrigger>

            <MenuContent collisionPadding={{ right: 25 }}>
                <UserDropdownMenuHeader user={user} />

                <DropdownMenu.Item name="Profile" onClick={() => navigate("/me")} />
                <DropdownMenu.Item name="Settings" onClick={() => navigate("/preferences")} />
                <DropdownMenu.ExternalLink name="About Haly" href="https://github.com/matiand/haly" />

                <DropdownMenu.Separator />

                <DropdownMenu.ExternalLink name="Account" href="https://www.spotify.com/us/account/overview" />
                <DropdownMenu.ExternalLink name="Dashboard" href="https://developer.spotify.com/dashboard" />

                <DropdownMenu.Separator />

                <DropdownMenu.Item name="Log out" onClick={onLogout} />
            </MenuContent>
        </DropdownMenu.Root>
    );
}

const MenuTrigger = styled(DropdownMenu.Trigger, {
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

const MenuContent = styled(DropdownMenu.Content, {
    maxWidth: "calc($dropdownMenuMinWidth + 60px)",
});

const UserIcon = styled(HiOutlineUser, {
    height: "20px",
    width: "20px",
});

export default UserDropdownMenu;
