import React, { useState, useEffect } from "react";

export default function Songs(props) {
    const [apiData, setApiData] = useState(null);

    async function getSongs() {
        const fetchHeaders = new Headers();
        fetchHeaders.append("Accept", "application/json");
        fetchHeaders.append("Authorization", "Bearer " + sessionStorage.getItem('token'));

        let requestOptions = {
            method: 'GET',
            headers: fetchHeaders,
            redirect: 'follow'
        };

        try {
            const request = await fetch("https://api.mediehuset.net/bakeonline/users", requestOptions);
            const response = await request.json();
            console.log(response);
            setApiData(response.categories);
        } catch (error) {
            // Fang fejl og vis hvis der er en
            console.log("getSongs -> Error", error);
        }
    }

    useEffect(() => {
        getSongs()
    }, [])

    return (        
        <div>
            <h1>Jokes</h1>
            <section>
            <ul>
                {
                    apiData && apiData.length > 0 && apiData.map((item, i) => 
                           <p key={i}>{item.username}</p>
                    )
                }
            </ul>
            </section>
        </div>
    )
}