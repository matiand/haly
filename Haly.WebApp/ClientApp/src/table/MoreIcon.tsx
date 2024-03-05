import { HiOutlineMenu } from "react-icons/hi";

import { styled } from "../common/theme";

function MoreIcon() {
    return (
        <Wrapper aria-label="More" title="More">
            <span aria-hidden>
                <HiOutlineMenu
                    style={{
                        height: "18px",
                        width: "18px",
                    }}
                />
            </span>
        </Wrapper>
    );
}

const Wrapper = styled("div", {});

export default MoreIcon;
