import { HiOutlineClock } from "react-icons/hi2";

import { styled } from "../common/theme";

function TrackDurationIcon() {
    return (
        <Wrapper aria-label="duration" title="duration">
            <span aria-hidden>
                <HiOutlineClock
                    style={{
                        height: "18px",
                        width: "18px",
                    }}
                />
            </span>
        </Wrapper>
    );
}

const Wrapper = styled("div", {
    marginRight: "$800",
});

export default TrackDurationIcon;
