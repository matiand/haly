import { LuDisc } from "react-icons/lu";

import { styled } from "../../common/theme";

type DiscRowProps = {
    discNumber: number;
};

function AlbumTableDiscRow({ discNumber }: DiscRowProps) {
    return (
        <DiscRow>
            <td>
                <span aria-hidden>
                    <LuDisc />
                </span>
            </td>
            <td colSpan={2}>Disc {discNumber}</td>
        </DiscRow>
    );
}

const DiscRow = styled("tr", {
    marginTop: "$400",

    "&& > td[colspan]": {
        color: "$white500",
        fontWeight: 700,
        justifySelf: "start",
        letterSpacing: "0.04em",
    },

    "&&:hover": {
        background: "transparent",
    },

    "& svg": {
        color: "$white500",
        height: "18px",
        width: "18px",
    },
});

export default AlbumTableDiscRow;
