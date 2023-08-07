import { HiOutlineExternalLink } from "react-icons/hi";

import { styled } from "../common/theme";
import { Item as UserDropdownItem } from "./UserDropdown";

type ExternalLinkProps = {
    name: string;
    href: string;
};

function ExternalLink({ name, href }: ExternalLinkProps) {
    return (
        <UserDropdownItem>
            <a href={href} target="_blank" rel="noreferrer">
                {name}

                <span aria-hidden>
                    <ExternalLinkIcon />
                </span>
            </a>
        </UserDropdownItem>
    );
}

const ExternalLinkIcon = styled(HiOutlineExternalLink, {
    height: "20px",
    width: "20px",
});

export default ExternalLink;
