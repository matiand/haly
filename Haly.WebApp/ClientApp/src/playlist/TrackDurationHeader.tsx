import { HiOutlineClock } from "react-icons/hi2";

function TrackDurationHeader() {
    return (
        <div aria-label="duration" title="duration">
            <HiOutlineClock style={{ height: "18px", width: "18px" }} />
        </div>
    );
}

export default TrackDurationHeader;
