import React from "react";

import { PlaylistMetadataDto } from "../../generated/haly";
import HeaderImage from "./HeaderImage";
import HeaderTitle from "./HeaderTitle";
import { styled } from "./theme";

type PageHeaderProps = {
    title: string;
    type: "Playlist" | "Profile" | "Album" | "Artist";
    subtitle?: string;
    imageUrl?: PlaylistMetadataDto["imageUrl"];
    description?: PlaylistMetadataDto["description"];
    children?: React.ReactNode;
};

function PageHeader({ title, type, subtitle, imageUrl, description, children }: PageHeaderProps) {
    const hasRoundedImage = type === "Profile" || type === "Artist";
    const altImageText = `${title} ${type.toLocaleLowerCase()} image`;

    return (
        <Wrapper>
            <HeaderImage imageUrl={imageUrl} alt={altImageText} isRounded={hasRoundedImage} />
            <PlaylistInfo>
                <Subtitle>{subtitle ?? type}</Subtitle>
                <HeaderTitle name={title} />
                {description && <Description>{description}</Description>}
                <Details>{children}</Details>
            </PlaylistInfo>
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
    fontSize: "$200",
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
        marginLeft: "$200",
    },
});

export default PageHeader;
