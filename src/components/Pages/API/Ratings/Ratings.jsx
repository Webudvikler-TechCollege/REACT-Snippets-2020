// Henter react
import React, { useState, useEffect } from 'react';
// Henter form hook fra NPM React-hook-form
import { useForm, ErrorMessage } from "react-hook-form";

const Container = props => {
    return (
        <div>
            <div>
                <Ratinglist></Ratinglist>
            </div>
            <div>
                <RatingForm></RatingForm>
            </div>
        </div>
    )
}

// Deklarerer Rating Liste component
const Ratinglist = props => {
    // Deklarerer hook
    const [apiData, setApiData] = useState(null);

    // Kalder useEffect til at lave 1. kald
    useEffect(() => {
        if(!apiData) {
            // Fetcher API
            fetch('https://api.mediehuset.net/overlook/ratings/list_by_hotel/1')
                .then((res) => res.json())
                .then((data) => 
                    setApiData(data.items)
                )
        }
    }, [apiData, setApiData]);

    return (
        <div>
            {apiData && 
                apiData.map(item => ( 
                    <li key={item.id}>{item.user_id}</li>
                ))
            }
        </div>
    )
}


const RatingForm = props => {
    const { handleSubmit, register, errors } = useForm();

    const onSubmit = async values => {
        console.log(values);

        let postHeaders = new Headers();
        postHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        postHeaders.append("Accept", "application/json");
        postHeaders.append("Authorization", "Bearer " + sessionStorage.getItem('token'));

        let urlencoded = new URLSearchParams();
        urlencoded.append("hotel_id", values.hotel_id);
        urlencoded.append("num_stars", values.num_stars);
        urlencoded.append("comment", values.comment);


        let deleteOptions = {
            method: 'DELETE',
            headers: postHeaders
        }

        await fetch("https://api.mediehuset.net/overlook/ratings/" + values.hotel_id, deleteOptions)
            .then(response => response.text())
            .then(result => console.dir('SLET: ' + result))
            .catch(error => console.log('error', error));


        let requestOptions = {
          method: 'POST',
          headers: postHeaders,
          body: urlencoded,
          redirect: 'follow'
        };
        
        fetch("https://api.mediehuset.net/overlook/ratings", requestOptions)
            .then(response => response.text())
            .then(result => console.dir('OPRET: ' + result))
            .catch(error => console.log('error', error));
        }

    return (
        <div>
            <h3>Indsend kommentar</h3>
            <section>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor="hotel_id">Hotel:</label>
                        <select  
                            name="hotel_id" 
                            ref={register({
                                required: "Nødvendig",
                            })} 
                        >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                        <ErrorMessage errors={errors} name={"hotel_id"}>
                            {({message}) => <span>{message}</span>}
                        </ErrorMessage>
                    </div><br />

                    <div>
                        <label htmlFor="num_stars">Antal stjerner</label>
                            <input type="radio" name="num_stars" value="1" />
                            <input type="radio" name="num_stars" value="2" />
                            <input type="radio" name="num_stars" value="3" />
                            <input type="radio" name="num_stars" value="4" />
                            <input type="radio" name="num_stars" value="5" />
                    </div>

                    <div>
                        <label htmlFor="comment">Kommentar</label>
                        <textarea 
                            name="comment" 
                            ref={register({
                                required: "Nødvendig"
                            })} 
                        />
                        <ErrorMessage errors={errors} name={"comment"}>
                            {({message}) => <span>{message}</span>}
                        </ErrorMessage>
                    </div>

                    <button type="submit">Send</button>
                    <br />
                    {props.children}

                </form>
            </section>
        </div>
    )    
}

export default Container;