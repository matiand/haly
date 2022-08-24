import { useEffect, useRef } from "react";

import { styled } from "../common/theme";

export function Login(props: { loginFn: () => unknown }) {
    console.log("Login");
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
    color: "$black700",
    textAlign: "center",
    "& h1": {
        marginBottom: "$500",
    },
});

export function SilentLogin(props: { loginFn: () => unknown }) {
    // This is a workaround for double renders in React 18 when using development mode.
    // SilentLogin usually crashes when it renders twice, so we use a ref to prevent it.
    const isFirstSilentLogin = useRef(true);

    useEffect(() => {
        if (isFirstSilentLogin.current) {
            isFirstSilentLogin.current = false;
            console.log("Silently logging in");
            props.loginFn();
        }
    }, [props]);

    return null;
}
