import { useQuery } from "@tanstack/react-query";

import halyClient from "../halyClient";

function ConnectMenu() {
    const query = useQuery(["me", "player", "devices"], () => halyClient.player.getAvailableDevices());

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
