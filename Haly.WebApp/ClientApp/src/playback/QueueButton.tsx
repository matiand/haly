import { LuMenu } from "react-icons/lu";
import { useLocation, useNavigate } from "react-router-dom";

import PlaybackButton from "./PlaybackButton";

function QueueButton() {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const isInQueue = pathname.startsWith("/queue");

    const onClick = () => {
        if (isInQueue) {
            navigate(-1);
        } else {
            navigate("/queue");
        }
    };

    return (
        <PlaybackButton
            onClick={onClick}
            label="Queue"
            checked={isInQueue ? "true" : "false"}
            icon={<LuMenu />}
            highlightedWhenActive
        />
    );
}

export default QueueButton;
