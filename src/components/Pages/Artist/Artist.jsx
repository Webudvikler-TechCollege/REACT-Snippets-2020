import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const apiUrl = 'https://api.mediehuset.net/mediesuset/';

export default function Lineup(props) {
    const [SceneData, setSceneData] = useState(null);
    return (
        <div className="container">
            <div className="left">
                <SceneList setSceneData={setSceneData} />
            </div>
            <div className="right">
                <ArtistList data={SceneData} />
            </div>
        </div>
    )
}
const ArtistList = props => {
    const {data} = props;
    //console.log(data);
    return (
        <div>
            {data && data.map(artist => (
                <div key={"artist-" + artist.id}>
                    <h6>{artist.title}</h6>
                    <Link to={"/artist?id=" + artist.id}>View artist</Link>
                </div>
            ))}
        </div>
    )
}
const SceneList = props => {
    const { setSceneData } = props;
    const [apiData, setApiData] = useState(null);
    useEffect(() => {
        if(!apiData) {
            fetch(apiUrl)
                .then((res) => res.json())
                .then((data) => setApiData(data));
        }
    }, [apiData, setApiData]);

    const fetchSceneData = id => {
        fetch('https://api.mediehuset.net/mediesuset/')
            .then((res) => res.json())
            .then((data) => {
                let stages = data.stages.items;

                let stage = stages.find(function(item, index) {
                    if(item.id === id) {
                        return item;
                    } else {
                        return null;
                    }
                });
                setSceneData(stage.events.items)
            })
    }

    return (
        <div className="Lineup">
        <div>
            <ul>
                {apiData && apiData?.stages.items.map((item) => {
                    return <li key={item.id}>
                                <button onClick={e => fetchSceneData(item.id)}>
                                    {item.name}
                                </button>
                            </li>
                })}
            </ul>
        </div>      
    </div>
    )
}