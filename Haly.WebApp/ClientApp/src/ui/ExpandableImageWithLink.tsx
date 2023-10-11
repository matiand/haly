import clsx from "clsx";
import React from "react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

import { styled, theme } from "../common/theme";

type Props = {
    imageUrl: string;
    linkUrl: string;
    isExpanded: boolean;
    toggle: () => void;
    onWrapperClick?: () => void;
    size: number;
    linkLabel: string;
    chevronLabel: string;
};

function ExpandableImageWithLink({ imageUrl, linkUrl, isExpanded, toggle, size, linkLabel, chevronLabel }: Props) {
    const navigate = useNavigate();

    const toggleImage = (e: React.MouseEvent) => {
        e.stopPropagation();

        toggle();
    };

    const navigateToTrack = () => {
        if (!window.location.href.includes(linkUrl)) {
            navigate(linkUrl);
        }
    };

    return (
        <Wrapper
            css={{ $$size: `${size}px` }}
            onClick={navigateToTrack}
            aria-label={linkLabel}
            title={linkLabel}
            className={clsx({ isExpanded })}
        >
            <Image src={imageUrl} loading="eager" />
            <ChevronBtn onClick={toggleImage} type="button" aria-label={chevronLabel} title={chevronLabel}>
                <span>{isExpanded ? <HiChevronDown /> : <HiChevronUp />}</span>
            </ChevronBtn>
        </Wrapper>
    );
}

const Wrapper = styled("div", {
    cursor: "pointer",
    display: "flex",
    flex: "0 0 auto",
    height: "$$size",
    position: "relative",
    width: "$$size",

    "& > img": {
        height: "$$size",
        width: "$$size",
    },

    "&.isExpanded": {
        bottom: `calc(${theme.sizes.playbackControlsHeight} + $$size + 2 * $400)`,
        display: "block",
        marginLeft: "$400",

        img: {
            border: "1px solid $black200",
        },

        button: {
            top: "4%",
            right: "4%",
        },
    },

    "&:hover > button": {
        opacity: 0.7,
    },
});

const Image = styled("img", {
    borderRadius: "4px",
    objectFit: "cover",
    objectPosition: "center center",
});

const ChevronBtn = styled("button", {
    $$size: "24px",
    $$iconSize: "20px",

    alignItems: "center",
    background: "$black800",
    borderRadius: "50%",
    color: "$white800",
    display: "flex",
    height: "$$size",
    justifyContent: "center",
    opacity: 0,
    position: "absolute",
    right: "8%",
    top: "8%",
    width: "$$size",

    "&:hover, &:focus": {
        opacity: 0.9,
        transform: "scale(1.1)",
    },

    svg: {
        height: "$$iconSize",
        width: "$$iconSize",
    },
});

export default ExpandableImageWithLink;
