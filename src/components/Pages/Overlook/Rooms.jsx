import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Styles from './Overlook.module.scss';

export default function Rooms(props) {

    // Komponent til divs med værelsesliste og detaljer
    const [RoomListData, setRoomListData] = useState(null);
    
    return (
        <div className={Styles.room_wrapper}>
            <div className={Styles.room_list}>
                <RoomList data={RoomListData} />
            </div>
            <div className="room_details">
                <RoomDetails setRoomListData={setRoomListData}></RoomDetails>
            </div>
        </div>
    )    
}

const RoomDetails = props => {
    const {data} = props;
    console.log(data);
    return (
        <div>
            
        </div>
    )
}

const RoomList = () => {
    const [apiData, setApiData] = useState(null);

    useEffect(() => {
        if(!apiData) {
            fetch('https://api.mediehuset.net/overlook/rooms/by_hotel/1')
                .then((res) => res.json())
                .then((data) => setApiData(data));

        }
    }, [apiData, setApiData]);

    const fetchRoomData = id => {
        fetch('https://api.mediehuset.net/overlook/rooms/' + id)
            .then((res) => res.json())
            .then((data) => {
                setApiData(data);
        })
    }    

    return (
        <div>
            {apiData && apiData?.items.map((item) => {
                return (
                    <li key={item.id}>
                        <img alt={item.images[0].title} src={item.images[0].image}></img>
                        <Link onClick={e => fetchRoomData(item.id)}>
                            {item.room_title}
                        </Link>
                    </li>
                )
            })}
        </div>
    )

}