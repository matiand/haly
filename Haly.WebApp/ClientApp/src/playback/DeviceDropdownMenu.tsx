import { useState } from "react";
import { LuMonitorSpeaker } from "react-icons/lu";

import { styled, theme } from "../common/theme";
import * as DropdownMenu from "../ui/DropdownMenu";
import DeviceDropdownMenuContent from "./DeviceDropdownMenuContent";

function DeviceDropdownMenu() {
    // We need to handle opening and closing the dropdown manually. By default the contents are
    // hidden when closed but still rendered. We prefer not doing that unless it's necessary, to
    // avoid hitting their servers on each render.
    const [isOpen, setIsOpen] = useState(false);

    return (
        <DropdownMenu.Root open={isOpen} onOpenChange={() => setIsOpen((prev) => !prev)}>
            <Trigger title="Connect to a device">
                <span aria-hidden>
                    <LuMonitorSpeaker />
                </span>
            </Trigger>

            {isOpen && <DeviceDropdownMenuContent />}
        </DropdownMenu.Root>
    );
}

const Trigger = styled(DropdownMenu.Trigger, {
    $$size: theme.sizes.playbackControlsButtonSize,

    background: "transparent",
    border: "none",
    color: "$white400",
    height: "$$size",
    minWidth: "$$size",
    width: "$$size",
    padding: "0 $400",

    "&:hover": {
        color: "$white800",
    },

    "&:active": {
        color: "$white400",
    },

    "& span, & svg": {
        height: "22px",
        width: "22px",
    },
});

export default DeviceDropdownMenu;
