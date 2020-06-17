import React, { useState, useEffect } from "react";

// Deklarerer const til apiUrl
const apiUrl = 'https://api.mediehuset.net/mediesuset/';

// Deklarerer Mål component
const Items = props => {
    // Deklarerer hook
    const [apiData, setApiData] = useState(null);

    // Kalder useEffect til at lave 1. kald
    useEffect(() => {
        if(!apiData) {
            // Fetcher API
            fetch(apiUrl)
                .then((res) => res.json())
                .then((data) => setApiData(data.stages.items[1].events.items))
        }
    }, [apiData, setApiData]);

    return (
        <div>
            {console.log(apiData)}
            {Array.isArray(apiData) && apiData.map(item => (
                <div key={item.id}>{item.title}</div>
            ))}
        </div>
    )
}

function App() {
    return (
        <div>
            <Items />
        </div>
    );
}

export default App;