import { styled } from "./theme";

function NotFound() {
    return (
        <main>
            <Wrapper>
                <h1>Page not found</h1>
                <p>We can&apos;t seem to find the page you are looking for.</p>
                <a href="/">Home</a>
            </Wrapper>
        </main>
    );
}

const Wrapper = styled("div", {
    color: "$white",
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

    "& > a": {
        background: "$white",
        border: "1px solid $black400",
        borderRadius: "48px",
        color: "$black800",
        fontWeight: "700",
        padding: "$500 $800",
        textDecoration: "none",
    },
});

export default NotFound;