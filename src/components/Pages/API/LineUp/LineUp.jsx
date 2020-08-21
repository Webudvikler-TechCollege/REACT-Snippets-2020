import React, { useState, useEffect } from 'react';
import Styles from './LineUp.module.scss';

export default function LineUp(props) {
    const [eventData, setEventData] = useState(false);
    return (
        <section>
            <div className={Styles.buttonpanel}>
                <StageList setEventData={setEventData}></StageList>
            </div>
            <div className={Styles.events}>
                <EventList data={eventData}></EventList>
            </div>
        </section>
    )
}

const StageList = props => {
    const [stageData, setStageData] = useState(false);
    const { setEventData } = props;

    useEffect(() => {
        if(!stageData) {
            fetch('https://api.mediehuset.net/mediesuset/')
                .then(response => response.json())
                .then(data => setStageData(data.stages.items))
        }
    }, [stageData, setStageData])
    
    const fetchStageData = id => {
        const stage = stageData.find(function(item, index) {
            if(item.id === id) {
                return item;
            } else {
                return null;
            }
        });        
        setEventData(stage.events.items)
    }

    return (
        <div>
            {stageData && stageData.map(({name, id}) => {
                return (
                    <button key={id} onClick={e => fetchStageData(id)}>{name}</button>
                )
            })}
        </div>
    )
    
}

const EventList = props => {
    const { data } = props;
    return (
        <>
            {data && data.map(({title, image, localtime, id, stage_id}) => {
                return (
                    <div key={id} style={{backgroundImage: `url(${image})`}}>
                        <div className={Styles.stage1}>
                            <h4>{title}</h4>
                            <h5>{localtime}</h5>
                        </div>                        
                    </div>
                )
            })}
        </>
    )
}