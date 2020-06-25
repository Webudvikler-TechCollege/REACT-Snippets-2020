import React from "react";
import { Link } from 'react-router-dom';
import Styles from "./SusDevGoals.module.scss";
import useFetch from 'use-http';


// Deklarerer Mål component
const Goals = props => {
    const {data} = useFetch('/sdg/goals', [])

    return (
        <div className={Styles.goals}>
            {data && data?.items.map(item => {
                return (
                    <div key={item.id}>
                        <Link to={"/goal?id=" + item.id}>
                            <img alt={item.title} src={item.icon}></img>
                        </Link>
                    </div>
                )
            })}
        </div>
    )
}

function GaolsContainer() {
    return (
        <div>
            <Goals />
        </div>
    );
}

export default GaolsContainer;