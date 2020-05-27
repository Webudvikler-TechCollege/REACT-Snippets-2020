import React, { useState, useEffect } from "react";

export default function Jokes(props) {
    
    const [apiData, setApiData] = useState(null);

    async function getJoke() {
        const fetchHeaders = new Headers();
        fetchHeaders.append("Accept", "application/json");
        try {
            const request = await fetch("https://icanhazdadjoke.com/", {headers: fetchHeaders});
            const response = await request.json();
            setApiData(response);
        } catch (error) {
            // Fang fejl og vis hvis der er en
            console.log("getJoke -> Error", error);
        }
    }

    useEffect(() => {
        getJoke()
    }, [])

    return (        
        <div>
            <h1>Jokes</h1>
            <section>
                <button onClick={getJoke}>Hent joke</button>
                <p>
                    {apiData && apiData.joke}
                </p>
            </section>
        </div>
    )
}