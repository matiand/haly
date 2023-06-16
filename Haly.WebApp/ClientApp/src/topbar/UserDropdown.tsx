import { AccessibleIcon } from "@radix-ui/react-accessible-icon";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useContext } from "react";
import { MdArrowDropDown } from "react-icons/md";
import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router-dom";

import { styled } from "../common/theme";
import { UserContext } from "../me/UserContext";

function UserDropdown() {
    const auth = useAuth();
    const navigate = useNavigate();
    const user = useContext(UserContext);

    const profileHref = `/me`;
    const appSettingsHref = `${profileHref}/appsettings`;

    return (
        <DropdownMenu.Root>
            <Trigger title="User actions">
                <TriggerTitle>{user.name}</TriggerTitle>
                <AccessibleIcon label="User actions">
                    <ArrorDown />
                </AccessibleIcon>
            </Trigger>

            <Content>
                <Item onClick={() => navigate(profileHref)}>Profile</Item>
                <Item onClick={() => navigate(appSettingsHref)}>Haly Settings</Item>
                <Separator />
                <Item onClick={() => auth.removeUser()}>Log out</Item>
            </Content>
        </DropdownMenu.Root>
    );
}

const Trigger = styled(DropdownMenu.Trigger, {
    height: "32px",
    position: "absolute",
    top: "$600",
    right: "$800",
    display: "flex",
    alignItems: "center",
    gap: "$400",
    padding: "$100",
    borderRadius: "23px",
    border: 0,
    color: "$white",
    backgroundColor: "$black500",
    fontSize: "$300",
    fontWeight: 700,
    userSelect: "none",
    pointerEvents: "auto",

    '&:hover, &:focus, &[data-state="open"]': {
        cursor: "pointer",
    },
});

const TriggerTitle = styled("span", {
    maxWidth: "$userDropdownTriggerSpanMinWidth",
    marginInlineStart: "$500",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
});

const ArrorDown = styled(MdArrowDropDown, {
    height: "28px",
    width: "28px",
    marginInlineEnd: "$200",
});

const Content = styled(DropdownMenu.Content, {
    width: "$userDropdownMinWidth",
    padding: "$300",
    color: "$white",
    backgroundColor: "$black500",
    fontSize: "$200",
    marginTop: "$400",
    borderRadius: "4px",
});

const Item = styled(DropdownMenu.Item, {
    padding: "$500",
    cursor: "default",
    "&:hover": {
        backgroundColor: "$black300",
        outline: 0,
    },
    a: {
        color: "unset",
        textDecoration: "none",
        cursor: "unset",
    },
});

const Separator = styled(DropdownMenu.Separator, {
    height: "1px",
    backgroundColor: "$black300",
});

export default UserDropdown;
