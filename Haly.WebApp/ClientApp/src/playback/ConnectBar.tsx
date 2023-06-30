import { styled } from "../common/theme";

function ConnectBar() {
    return (
        <Wrapper>
            <span aria-live="polite">Listening on Arequipa</span>
        </Wrapper>
    );
}

const Wrapper = styled("div", {
    alignItems: "center",
    background: "$primary400",
    borderRadius: "4px",
    display: "flex",
    justifyContent: "flex-end",
    height: "$connectBarHeight",
    userSelect: "none",
    width: "100%",

    "& > span": {
        color: "$black800",
        fontSize: "$300",
        fontWeight: 500,
        marginRight: "$900",
    },
});

export default ConnectBar;
