import React, { useState, useEffect } from "react";
import Styles from "./FetchGoals.module.scss";


// Deklarerer const til apiUrl
const apiUrl = 'https://api.mediehuset.net/sdg/goals';

// Deklarerer Mål component
const Goals = props => {
    // Deklarerer hook
    const [goalData, setGoalData] = useState(null);

    // Kalder useEffect til at lave 1. kald
    useEffect(() => {
        if(!goalData) {
            // Fetcher API
            fetch(apiUrl)
                .then((res) => res.json())
                .then((data) => setGoalData(data))
        }
    }, [goalData, setGoalData]);

    return (
        <div className={Styles.goals}>
            {goalData && goalData?.items.map(item => {
                return (
                    <div key={item.id}>
                        <img alt={item.title} src={item.image.fullpath}></img>
                    </div>
                )
            })}
        </div>
    )
}

function App() {
    return (
        <div>
            <Goals />
        </div>
    );
}

export default App;