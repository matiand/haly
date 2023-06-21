import { HiOutlineClock } from "react-icons/hi2";

function TrackDurationHeader() {
    return (
        <div aria-label="duration" title="duration">
            <span>
                <HiOutlineClock
                    style={{
                        height: "18px",
                        width: "18px",
                    }}
                />
            </span>
        </div>
    );
}

export default TrackDurationHeader;
