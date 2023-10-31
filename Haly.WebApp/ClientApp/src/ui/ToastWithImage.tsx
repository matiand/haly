import React from "react";

import { styled } from "../common/theme";

type ToastWithImageProps = {
    imageUrl: string;
    children: React.ReactNode;
};

function ToastWithImage({ imageUrl, children }: ToastWithImageProps) {
    return (
        <Wrapper>
            <img src={imageUrl} alt="" width={32} height={32} />
            <div>{children}</div>
        </Wrapper>
    );
}

const Wrapper = styled("div", {
    alignItems: "center",
    borderRadius: "8px",
    display: "flex",
    gap: "$400",

    img: {
        borderRadius: "4px",
    },
});

export default ToastWithImage;
