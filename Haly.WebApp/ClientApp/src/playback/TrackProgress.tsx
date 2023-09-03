import { useState } from "react";

function TrackProgress() {
    const [progressInMs, setProgressInMs] = useState();

    //     useInterval(
    //         () => {
    //             setProgressInMs(isPaused ? positionInMs : Date.now() - fromTimestamp);
    //         },
    //         isPaused ? null : 1000,
    //     );
}

export default TrackProgress;
