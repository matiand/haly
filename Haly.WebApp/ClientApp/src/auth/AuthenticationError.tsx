import { styled } from "../common/theme";

type AuthenticationErrorProps = {
    message: string;
    logout: () => unknown;
};

function AuthenticationError(props: AuthenticationErrorProps) {
    return (
        <Main>
            <ErrorBox>
                <h1>Authentication error</h1>
                <pre>{props.message}</pre>
                <p>You should try refreshing the page and if that fails, log out and log in again.</p>
                <button type="button" onClick={() => props.logout()}>
                    Log out
                </button>
            </ErrorBox>
        </Main>
    );
}

const Main = styled("main", {
    alignContent: "center",
    display: "grid",
    height: "60%",
    justifyContent: "center",
});

const ErrorBox = styled("div", {
    border: "2px solid $danger400",
    borderRadius: "4px",
    padding: "$600",
    width: "60vw",

    "& > h1": {
        fontSize: "$600",
        fontWeight: "400",
    },

    "& > pre, & > p": {
        whiteSpace: "normal",
        margin: "$600 0",
    },

    button: {
        cursor: "pointer",
        float: "right",
        padding: "$100 $400",
    },
});

export default AuthenticationError;
