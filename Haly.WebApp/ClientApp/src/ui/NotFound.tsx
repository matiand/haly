import { useNavigate } from "react-router-dom";

import { styled } from "../common/theme";
import useDocumentTitle from "../common/useDocumentTitle";
import Button from "./Button";

function NotFound() {
    useDocumentTitle("Page not found");

    const navigate = useNavigate();

    return (
        <main>
            <Wrapper>
                <h1>Page not found</h1>
                <p>We can&apos;t seem to find the page you are looking for.</p>
                <Button variant="round" type="button" onClick={() => navigate("/")}>
                    Home
                </Button>
            </Wrapper>
        </main>
    );
}

const Wrapper = styled("div", {
    color: "$white800",
    marginTop: "25vh",
    textAlign: "center",
    fontWeight: "500",

    "& > h1": {
        fontSize: "$700",
        fontWeight: "700",
        letterSpacing: "-0.02em",
        marginBottom: "$400",
    },

    "& > p": {
        marginBottom: "$900",
    },
});

export default NotFound;
