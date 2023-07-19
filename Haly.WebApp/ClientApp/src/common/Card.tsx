import { Link, useNavigate } from "react-router-dom";

import { PlaylistMetadataDto } from "../../generated/haly";
import PlaybackToggle from "../playback/PlaybackToggle";
import EmptyCoverImage from "./EmptyCoverImage";
import { styled } from "./theme";

export type CardProps = {
    id: string;
    name: string;
    href: string;
    // A subtitle OR or a year + subtitle tuple
    subtitle?: string | [number, string];
    imageUrl?: PlaylistMetadataDto["imageUrl"];
    isPlayable: boolean;
    hasRoundedImage: boolean;
};

function Card({ name, href, subtitle, imageUrl, isPlayable, hasRoundedImage }: CardProps) {
    const navigate = useNavigate();

    return (
        <Wrapper onClick={() => navigate(href)}>
            <ImageWrapper data-is-rounded={hasRoundedImage}>
                {imageUrl ? <img loading="lazy" src={imageUrl} alt="" /> : <EmptyCoverImage type="card" />}

                {isPlayable && (
                    <div id="card-playback-wrapper">
                        <PlaybackToggle size="medium" />
                    </div>
                )}
            </ImageWrapper>

            <Contents>
                <div>
                    <Link className="ellipsis" to={href} title={name}>
                        {name}
                    </Link>
                </div>

                {typeof subtitle === "string" && <div>{subtitle}</div>}
                {typeof subtitle === "object" && (
                    <div>
                        <time dateTime={subtitle[0].toString()}>{subtitle[0]}</time>
                        <span>{subtitle[1]}</span>
                    </div>
                )}
            </Contents>
        </Wrapper>
    );
}

const Wrapper = styled("div", {
    background: "$black400",
    borderRadius: "4px",
    cursor: "pointer",
    padding: "$600",
    transition: "background-color 0.3s ease",
    userSelect: "none",

    "&:hover, &:focus, &:focus-within": {
        background: "$black200",

        "& #card-playback-wrapper": {
            opacity: 1,
            transform: "translateY(0)",
        },
    },
});

const ImageWrapper = styled("div", {
    background: "$black200",
    marginBottom: "$600",
    paddingBottom: "100%",
    position: "relative",

    "& > img": {
        background: "$black100",
        borderRadius: "4px",
        boxShadow: "0 4px 24px $cardImage",
        height: "100%",
        left: 0,
        objectFit: "cover",
        position: "absolute",
        top: 0,
        width: "100%",
    },

    "&[data-is-rounded=true]": {
        borderRadius: "50%",
        "& > img": {
            borderRadius: "50%",
        },
    },

    "& #card-playback-wrapper": {
        bottom: "8px",
        opacity: 0,
        position: "absolute",
        right: "8px",
        transform: "translateY(8px)",
        transition: "opacity 0.3s ease, transform 0.3s ease",
    },
});

const Contents = styled("div", {
    minHeight: "60px",

    "& a": {
        color: "$white800",
        display: "block",
        fontSize: "$350",
        fontWeight: 700,
        letterSpacing: "0.02em",
        paddingBottom: "$300",
        textDecoration: "none",

        "&:focus-visible": {
            outline: "1px solid $white800",
        },
    },

    "& div": {
        color: "$white400",
        display: "flex",
        fontSize: "$300",
        fontWeight: 500,
        textTransform: "capitalize",

        "& > span::before": {
            content: "•",
            fontWeight: 100,
            margin: "0 $200",
        },
    },
});

export default Card;
