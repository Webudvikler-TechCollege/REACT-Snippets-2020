import React, { useState, useEffect } from "react";
import Styles from "./FetchTest.module.scss";

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
                .then((data) => setApiData(data))
        }
    }, [apiData, setApiData]);

    return (
        <div className={Styles.events}>
            {apiData && 
                apiData.stages && 
                apiData.stages.items && 
                apiData.stages.items.map(stage => (
                    stage.events.items.map(({id, title, local_time, stage_name }) => {
                        return (
                            <div key={id} className={Styles.red}>
                                <h3>{title}</h3>
                                <h6>{local_time}</h6>
                                <h6>{stage_name}</h6>
                                <hr />
                            </div>
                        )
                    })
                ))
            }
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