import { styled } from "../common/theme";

function Resizer() {
    return (
        <ResizerWrapper>
            <span className="hidden-visually">Resize library sidebar</span>
        </ResizerWrapper>
    );
}

const ResizerWrapper = styled("div", {
    width: "10px",
    cursor: "col-resize",
    opacity: 0,
    position: "absolute",
    top: "-1px",
    right: "-5px",
    bottom: 0,
    zIndex: "$resizer",
    background: "linear-gradient($white800, $white800) no-repeat center/1px 100%",

    "&:hover": {
        opacity: 1,
    },
});

export default Resizer;
