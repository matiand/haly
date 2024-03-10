import { styled } from "../common/theme";
import Button from "../ui/Button";
import Logo from "./Logo";

export function Login(props: { loginFn: () => unknown }) {
    return (
        <Main>
            <div>
                <Logo />
                <h1>Haly</h1>
            </div>

            <Button variant="round" type="button" onClick={props.loginFn}>
                Sign in
            </Button>
        </Main>
    );
}

const Main = styled("main", {
    color: "$white800",
    display: "grid",
    justifyContent: "center",
    padding: "$900 0 0",
    userSelect: "none",
    width: "100%",

    div: {
        alignItems: "center",
        display: "flex",
        flexFlow: "column",
        justifyContent: "center",
        padding: "$900 0 calc(2 * $900)",

        svg: {
            height: "128px",
            width: "128px",
        },
    },

    h1: {
        fontFamily: "Heebo, sans-serif",
        fontSize: "$700",
        fontWeight: 700,
        letterSpacing: "0.06em",
        lineHeight: 2,
    },
});
