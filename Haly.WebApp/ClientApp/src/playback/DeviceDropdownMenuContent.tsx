import { useQuery } from "@tanstack/react-query";
import { LuLaptop2, LuSmartphone, LuSquareDot } from "react-icons/lu";

import { DeviceDto } from "../../generated/haly";
import { styled } from "../common/theme";
import halyClient from "../halyClient";
import * as DropdownMenu from "../menus/DropdownMenu";
import ActiveDevice from "./ActiveDevice";

function DeviceDropdownMenuContent() {
    const query = useQuery({
        queryKey: ["me", "player", "devices"],
        queryFn: () => halyClient.player.getAvailableDevices(),
        refetchOnWindowFocus: "always",
    });

    if (!query.data) return null;

    const activeDevice = query.data.find((device) => device.isActive);
    const remaining = query.data.filter((device) => !device.isActive);

    return (
        <Content sideOffset={12}>
            {activeDevice && <ActiveDevice name={activeDevice.name} />}

            {remaining.length > 0 && <h4>Select another device</h4>}

            {remaining.map((device) => {
                return (
                    <Item key={device.id} onClick={() => halyClient.player.transferPlayback({ deviceId: device.id })}>
                        <span aria-hidden>{chooseIcon(device)}</span>
                        <div>{device.name}</div>
                    </Item>
                );
            })}

            <DropdownMenu.ExternalLink
                name={"Don't see your device?"}
                href="https://support.spotify.com/us/article/spotify-connect/"
            />
            <DropdownMenu.ExternalLink name="What can I connect to?" href="https://connect.spotify.com/" />
        </Content>
    );
}

function chooseIcon(device: DeviceDto) {
    switch (device.type) {
        case "Computer":
            return <LuLaptop2 />;
        case "Smartphone":
            return <LuSmartphone />;
        default:
            return <LuSquareDot />;
    }
}

const Content = styled(DropdownMenu.Content, {
    borderRadius: "8px",
    fontSize: "$350",
    minWidth: "$playbackDevicesDropdownMinWidth",
    padding: "$700 $600 $600",

    "& > *": {
        padding: "$600",
    },
});

const Item = styled(DropdownMenu.ItemBase, {
    alignItems: "center",
    display: "flex",
    gap: "$600",

    "&&": {
        padding: "$600",
    },

    "& > span, & svg": {
        height: "$deviceDropdownIconSize",
        width: "$deviceDropdownIconSize",
    },
});

export default DeviceDropdownMenuContent;
