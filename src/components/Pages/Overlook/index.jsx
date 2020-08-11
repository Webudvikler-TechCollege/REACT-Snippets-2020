import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Styles from './overlook.module.scss';
//import Header from '../../images/iceland.jpg'
//import Search from '../../Search/Search'

const apiUrl = 'https://api.mediehuset.net/overlook/countries';

export default function Lineup(props) {
    const [CountryData, setCountryData] = useState(null);
        return (
            <div className="Destinations">
                <div className="scenes">
                <CountryList setCountryData={setCountryData} />
                </div>
                <div className="artists">
                    <LocationList data={CountryData} />
                </div>
            </div>
        )
    }

    const LocationList = props => {
        const {data} = props;
        console.log(props);
        return (
            <div className="locationGrid">
                {/**
                {data && data.map(item => (
                    <div key={"location-" + item.id}>
                        <div className="gridItem">
                        <Link to={"/location?id=" + item.id}>
                        <img src={item.image}/>
                        <h4>{item.name}</h4>
                        </Link>
                        </div>
                    </div>
                ))}
                */}
            </div>
        )
    }
    const CountryList = props => {
        const { setCountryData } = props;
        const [apiData, setApiData] = useState(null);
        useEffect(() => {
            if(!apiData) {
                fetch(apiUrl)
                    .then((res) => res.json())
                    .then((data) => setApiData(data));
            }
        }, [apiData, setApiData]);
        const fetchCountryData = id => {
            fetch('https://api.mediehuset.net/overlook/countries')
                .then((res) => res.json())
                .then((data) => {
                    let destinations = data.items;
                    let destination = destinations.find(function(item, index) {
                        if(item.id === id) {
                            fetch('https://api.mediehuset.net/overlook/countries/' + id)
                                .then((res2) => res2.json())
                                .then((location) => {
                                    let locations = location.item.cities.items;
                                    return locations;
                                })
                        } else {
                            return null;
                        }
                    });
                    setCountryData(destination)
                })
            }
        return (
            <div className="HOD">
                <div className="Grid">
                    {apiData && apiData?.items.map((item) => {
                        return <span key={item.id}>
                                    <Link onClick={e => fetchCountryData(item.id)}>
                                        {item.name}
                                    </Link>
                                </span>
                    })}    
        </div>
            </div>
        )
    }