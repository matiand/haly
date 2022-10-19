import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";

import useAccessToken from "../auth/useAccessToken";
import halyClient from "../halyClient";
import { UserContext } from "../me/UserContext";

function ConnectMenu() {
    const accessToken = useAccessToken();
    const user = useContext(UserContext);
    const query = useQuery(["me", "player", "devices"], () =>
        halyClient.player.getAvailableDevices({ userId: user.id, xSpotifyToken: accessToken }),
    );

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

export default ConnectMenu;
