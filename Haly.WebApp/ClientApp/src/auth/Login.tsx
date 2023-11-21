import { styled } from "../common/theme";

export function Login(props: { loginFn: () => unknown }) {
    return (
        <Main>
            <h1>HALY</h1>
            <button type="button" onClick={props.loginFn}>
                Log in
            </button>
        </Main>
    );
}

const Main = styled("main", {
    width: "40vw",
    margin: "$900 auto",
    color: "$white800",
    textAlign: "center",

    h1: {
        marginBottom: "$500",
    },

    button: {
        background: "$white800",
        borderRadius: "999px",
        cursor: "pointer",
        fontWeight: 700,
        padding: "$400 $800",

        "&:hover": {
            transform: "scale(1.05)",
        },
    },
});
