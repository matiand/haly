import { styled } from "../common/theme";

type GreetingProps = {
    date: Date;
};

const greetings = ["Good morning", "Good afternoon", "Good evening"];

function Greeting({ date }: GreetingProps) {
    const hour = date.getHours();

    if (hour < 12) return <Heading>{greetings[0]}</Heading>;
    if (hour < 18) return <Heading>{greetings[1]}</Heading>;

    return <Heading>{greetings[2]}</Heading>;
}

const Heading = styled("h1", {
    color: "$white800",
    fontSize: "$600",
    fontWeight: 800,
    letterSpacing: "-0.01em",
    marginTop: "$400",
    userSelect: "none",
});

export default Greeting;
