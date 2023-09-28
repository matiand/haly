import { LuMenu } from "react-icons/lu";
import { useLocation, useNavigate } from "react-router-dom";

import PlaybackButton from "./PlaybackButton";

// Contents of window.history.state. Tested on Chrome, Firefox, Edge.
type HistoryState = {
    idx: number;
};

function QueueButton() {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const isInQueue = pathname.startsWith("/queue");
    const historyState = window.history.state as HistoryState;

    const onClick = () => {
        if (isInQueue && historyState.idx > 0) {
            navigate(-1);
        } else if (isInQueue && historyState.idx === 0) {
            navigate("/");
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