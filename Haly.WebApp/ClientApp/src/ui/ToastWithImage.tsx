import React from "react";

import { PlaylistBriefDto } from "../../generated/haly";
import { classNames, styled } from "../common/theme";

type ToastWithImageProps = {
    imageUrl: PlaylistBriefDto["imageUrl"];
    children: React.ReactNode;
};

function ToastWithImage({ imageUrl, children }: ToastWithImageProps) {
    return (
        <Wrapper>
            {imageUrl && <img src={imageUrl} alt="" width={36} height={36} />}
            <div className={classNames.clampEllipsis}>{children}</div>
        </Wrapper>
    );
}

const Wrapper = styled("div", {
    alignItems: "center",
    borderRadius: "8px",
    display: "flex",
    gap: "$500",

    img: {
        border: "1px solid $black800",
        borderRadius: "4px",
    },

    b: {
        marginInlineStart: "1px",
    },
});

export default ToastWithImage;
