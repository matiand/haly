import { styled } from "../common/theme";
import Button from "../ui/Button";

export function Login(props: { loginFn: () => unknown }) {
    return (
        <Main>
            <h1>HALY</h1>
            <Button label="Log in" onClick={props.loginFn} />
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
});
