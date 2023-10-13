import { KeyboardEventHandler } from "react";
import { Link, useNavigate } from "react-router-dom";

import { PlaylistCardDto } from "../../../generated/haly";
import { styled } from "../../common/theme";

type CardProps = {
    id: string;
    name: string;
    href: string;
    subtitle?: string;
    imageUrl: PlaylistCardDto["imageUrl"];
    hasRoundedImage: boolean;
};
const imgSize = 80;

function MiniCard({ name, href, subtitle, imageUrl, hasRoundedImage }: CardProps) {
    const navigate = useNavigate();

    const navigateOnEnter: KeyboardEventHandler = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            navigate(href);
        }
    };

    return (
        <Wrapper>
            {imageUrl && (
                <ImageWrapper tabIndex={0} role="button" onClick={() => navigate(href)} onKeyDown={navigateOnEnter}>
                    <img
                        loading="lazy"
                        src={imageUrl}
                        alt=""
                        height={imgSize}
                        width={imgSize}
                        data-is-rounded={hasRoundedImage}
                    />
                </ImageWrapper>
            )}

            <ContentWrapper>
                <Link className="line-clamp-ellipsis" to={href} title={name}>
                    {name}
                </Link>
                {subtitle && <Subtitle className="line-clamp-ellipsis">{subtitle}</Subtitle>}
            </ContentWrapper>
        </Wrapper>
    );
}

const Wrapper = styled("div", {
    columnGap: "$600",
    display: "grid",
    gridTemplateColumns: "auto 1fr",
    userSelect: "none",
});

const ImageWrapper = styled("div", {
    cursor: "pointer",
    height: `${imgSize}px`,
    width: `${imgSize}px`,

    "& > img": {
        borderRadius: "4px",
        objectFit: "cover",
        objectPosition: "center center",

        "&[data-is-rounded=true]": {
            borderRadius: "50%",
        },
    },
});

const ContentWrapper = styled("div", {
    alignSelf: "center",

    "& > a": {
        color: "$white800",
        fontSize: "$300",
        fontWeight: 700,
        gridArea: "title",
        letterSpacing: "0.04em",
        textDecoration: "none",

        "&:hover": {
            textDecoration: "underline",
        },
    },
});

const Subtitle = styled("div", {
    color: "$white500",
    fontSize: "$200",
    fontWeight: 500,
});

export default MiniCard;
