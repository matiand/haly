import React from "react";

import { PlaylistWithTracksDto } from "../../generated/haly";
import { styled } from "../common/theme";
import usePageHeaderVisibility from "../common/usePageHeaderVisibility";
import { DraggableData } from "../dnd/useDraggable";
import HeaderImage from "./HeaderImage";
import HeaderTitle from "./HeaderTitle";

type PageHeaderProps = {
    title: string;
    type: "Playlist" | "Profile" | "Album" | "Artist";
    subtitle?: string;
    imageUrl?: PlaylistWithTracksDto["imageUrl"];
    description?: PlaylistWithTracksDto["description"];

    onContextMenu?: (e: React.MouseEvent) => void;
    onEditDetails?: () => void;
    onViewArtwork?: () => void;
    draggableData?: DraggableData;

    children?: React.ReactNode;
};

function PageHeader({
    title,
    type,
    subtitle,
    imageUrl,
    description,
    onContextMenu,
    onEditDetails,
    onViewArtwork,
    draggableData,
    children,
}: PageHeaderProps) {
    const { ref } = usePageHeaderVisibility();

    const hasRoundedImage = type === "Profile" || type === "Artist";
    const altImageText = `${title} ${type.toLocaleLowerCase()} image`;

    return (
        <Wrapper ref={ref}>
            <HeaderImage
                imageUrl={imageUrl}
                alt={altImageText}
                isRounded={hasRoundedImage}
                onViewArtwork={onViewArtwork}
                onContextMenu={onContextMenu}
                draggableData={draggableData}
            />

            <InformationSection>
                <Subtitle>{subtitle ?? type}</Subtitle>

                <HeaderTitle
                    name={title}
                    onEditDetails={onEditDetails}
                    onContextMenu={onContextMenu}
                    draggableData={draggableData}
                />

                {description && <Description>{description}</Description>}
                <Details>{children}</Details>
            </InformationSection>

            {/*// todo: which ref is needed*/}
            <div ref={ref} aria-hidden />
        </Wrapper>
    );
}

const InformationSection = styled("section", {
    display: "flex",
    flexFlow: "column",
    justifyContent: "flex-end",
    width: "100%",
});

const Wrapper = styled("div", {
    alignItems: "flex-end",
    color: "$white800",
    display: "flex",
    maxHeight: "400px",
    minHeight: "272px",
    padding: "0 0 $700",
    position: "relative",
    userSelect: "none",

    [`& > :first-child:not(${InformationSection})`]: {
        flex: "0 0 auto",
        marginRight: "$700",
    },
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
