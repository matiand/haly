import { styled } from "../common/theme";

type CopyrightsProps = {
    text: string[];
    date: string;
};

function Copyrights({ text, date }: CopyrightsProps) {
    return (
        <Wrapper>
            <p>{date}</p>
            {text.map((t, idx) => (
                <p key={idx}>{t}</p>
            ))}
        </Wrapper>
    );
}

const Wrapper = styled("div", {
    color: "$white600",
    fontFamily: "sans-serif",
    fontSize: "$50",
    letterSpacing: "0.02em",
    margin: "$800 0 $600",

    "& > p:first-child": {
        fontSize: "$300",
        marginBottom: "$100",
    },
});

export default Copyrights;
