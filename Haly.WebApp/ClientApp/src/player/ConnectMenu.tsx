import { useQuery } from "@tanstack/react-query";

import useAccessToken from "../auth/useAccessToken";
import halyClient from "../halyClient";

function ConnectMenu() {
    const accessToken = useAccessToken();
    const query = useQuery(["me", "player", "devices"], () =>
        halyClient.currentUser.getAvailableDevices({ xSpotifyToken: accessToken }),
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
