import MiniPageHeader from "../ui/MiniPageHeader";

type GreetingProps = {
    date: Date;
};

const greetings = ["Good morning", "Good afternoon", "Good evening"];

function Greeting({ date }: GreetingProps) {
    const hour = date.getHours();

    if (hour < 12) return <MiniPageHeader title={greetings[0]} />;
    if (hour < 18) return <MiniPageHeader title={greetings[1]} />;

    return <MiniPageHeader title={greetings[2]} />;
}

export default Greeting;
