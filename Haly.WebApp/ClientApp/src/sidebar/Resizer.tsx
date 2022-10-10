import { styled } from "../common/theme";

function Resizer() {
    return (
        <ResizerWrapper>
            <span className="hidden-visually">Resize main navigation</span>
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
    zIndex: 100,
    background: "linear-gradient($white, $white) no-repeat center/1px 100%",

    "&:hover": {
        opacity: 1,
    },
});

export default Resizer;
