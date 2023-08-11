import { theme } from "../common/theme";
import PageGradient from "../playlist/PageGradient";
import Greeting from "./Greeting";

function Home() {
    const dominantColor = theme.colors.dominantDefault;
    const purple = theme.colors.dominantLikedSongs;

    return (
        <div>
            <Greeting date={new Date()} />

            {/*<PageGradient color={dominantColor} type="home" />*/}
            <PageGradient color={purple} type="home" />
        </div>
    );
}

export default Home;
