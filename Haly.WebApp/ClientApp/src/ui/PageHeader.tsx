import { useSetAtom } from "jotai";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { PlaylistWithTracksDto } from "../../generated/haly";
import { pageHeaderVisibilityAtom } from "../common/atoms";
import HeaderImage from "./HeaderImage";
import HeaderTitle from "./HeaderTitle";
import { styled } from "../common/theme";

type PageHeaderProps = {
    title: string;
    type: "Playlist" | "Profile" | "Album" | "Artist";
    subtitle?: string;
    imageUrl?: PlaylistWithTracksDto["imageUrl"];
    description?: PlaylistWithTracksDto["description"];
    children?: React.ReactNode;
};

function PageHeader({ title, type, subtitle, imageUrl, description, children }: PageHeaderProps) {
    const setPageHeaderVisibility = useSetAtom(pageHeaderVisibilityAtom);
    const { ref } = useInView({
        threshold: [0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0],
        onChange: (_, entry) => {
            setPageHeaderVisibility(entry.intersectionRatio);
        },
    });

    useEffect(() => {
        return () => setPageHeaderVisibility(1);
    }, [setPageHeaderVisibility]);

    const hasRoundedImage = type === "Profile" || type === "Artist";
    const altImageText = `${title} ${type.toLocaleLowerCase()} image`;

    return (
        <Wrapper ref={ref}>
            <HeaderImage imageUrl={imageUrl} alt={altImageText} isRounded={hasRoundedImage} />
            <PlaylistInfo>
                <Subtitle>{subtitle ?? type}</Subtitle>
                <HeaderTitle name={title} />
                {description && <Description>{description}</Description>}
                <Details>{children}</Details>
            </PlaylistInfo>

            <div ref={ref} aria-hidden />
        </Wrapper>
    );
}

const Wrapper = styled("div", {
    alignItems: "flex-end",
    color: "$white800",
    display: "flex",
    maxHeight: "400px",
    minHeight: "272px",
    padding: "0 0 $700",
    position: "relative",
    userSelect: "none",

    "& > img": {
        marginRight: "$700",
    },
});

const PlaylistInfo = styled("div", {
    display: "flex",
    flexFlow: "column",
    justifyContent: "flex-end",
    width: "100%",
});

const Subtitle = styled("h2", {
    fontSize: "$300",
    fontWeight: 700,
    letterSpacing: "0.02em",
    marginBottom: "$200",
});

const Description = styled("p", {
    color: "$collectionTextFaded",
    fontSize: "$200",
    fontWeight: 500,
});

const Details = styled("div", {
    alignItems: "center",
    display: "flex",
    flexWrap: "wrap",
    fontSize: "$200",
    fontWeight: 500,
    letterSpacing: "0.02em",
    marginTop: "$400",

    "& > span > a": {
        color: "inherit",
        textDecoration: "none",

        "&:hover": {
            textDecoration: "underline",
        },
    },

    "& > span:not(:last-child)::after": {
        content: "•",
        fontWeight: 400,
        margin: "0 $200",
    },

    "& > span strong": {
        fontWeight: 700,
    },

    "& > span > span": {
        color: "$collectionTextFaded",
        display: "inline",
        marginLeft: "$100",
    },
});

export default PageHeader;
