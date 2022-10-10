function Home() {
    const greetings = ["Welcome", "Hello", "Hi"];
    const randomGretting = greetings[Math.floor(Math.random() * greetings.length)];

    return (
        <main>
            <h1 style={{ color: "#fff", fontSize: "72px" }}>{randomGretting}</h1>
            <br />
            <br />
        </main>
    );
}

export default Home;
