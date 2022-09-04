import { useQuery } from "@tanstack/react-query";

import useAccessToken from "../auth/useAccessToken";

function ConnectMenu() {
    const accessToken = useAccessToken();
    const query = useQuery(["me", "player", "devices"], () => fetchDevices(accessToken));

    if (!query.data) return null;

    return (
        <section>
            <h2>Available Devices</h2>
            <ul>
                {query.data.map(({ id, name, isActive }) => (
                    <li key={id}>
                        {isActive && ">"} {name}
                    </li>
                ))}
            </ul>
        </section>
    );
}

type Device = {
    id: string;
    name: string;
    isActive: boolean;
    volumePercent: number;
};

async function fetchDevices(accessToken: string) {
    const resp = await fetch(`${import.meta.env.VITE_API_ORIGIN}/users/me/player/devices`, {
        headers: { "x-spotify-token": accessToken },
    });
    if (resp.ok) {
        console.log("Devices:", resp.statusText);
        return (await resp.json()) as Device[];
    }

    throw resp;
}

export default ConnectMenu;
