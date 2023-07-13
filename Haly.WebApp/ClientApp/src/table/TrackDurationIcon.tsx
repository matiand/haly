import { HiOutlineClock } from "react-icons/hi2";

function TrackDurationIcon() {
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

export default TrackDurationIcon;
