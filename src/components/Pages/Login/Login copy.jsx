// Henter react
import React from 'react';
// Henter form hook fra NPM React-hook-form
import { useForm, ErrorMessage } from "react-hook-form";

const Form = props => {
    const { handleSubmit, register, errors } = useForm();

    const onSubmit = values => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        
        let urlencoded = new URLSearchParams();
        urlencoded.append("username", values.username);
        urlencoded.append("password", values.password);
        
        let requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: urlencoded,
          redirect: 'follow'
        };
        
        fetch("https://api.mediehuset.net/token", requestOptions)
          .then(response => response.json())
          .then(result => {
              if(result.access_token) {
                sessionStorage.setItem('token', result.access_token);
                sessionStorage.setItem('user_id', result.user_id);
                
                if(sessionStorage.getItem('token')) {

                    const fetchHeaders = new Headers();
                    fetchHeaders.append("Accept", "application/json");
                    fetchHeaders.append("Authorization", "Bearer " + sessionStorage.getItem('token'));
                    fetchHeaders.append('Access-Control-Allow-Origin', 'http://localhost:3000/');

                    let fetchOptions = {
                        method: 'GET',
                        headers: fetchHeaders,
                        redirect: 'follow',
                        //mode: 'no-cors'
                    };                    

                    //Fetcher endpoint med requestOptions
                    //  fetch("https://api.mediehuset.net/bakeonline/comments/1", requestOptions)
                    fetch("https://api.mediehuset.net/bakeonline/comments/1", fetchOptions)
                        .then(response => response.json())
                        .then(result => {
                            console.log(result);
                        })
                        .catch(error => console.log('error', error));
                    }
              }
          })
          .catch(error => console.log('error', error));
          
          
    }

    return (
        <div>
            <h1>Kontakt os</h1>
            <section>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor="username">Username</label>
                        <input 
                            name="username" 
                            ref={register({
                                required: "Nødvendig",
                            })} 
                        />
                        <ErrorMessage errors={errors} name={"email"}>
                            {({message}) => <span>{message}</span>}
                        </ErrorMessage>
                    </div>

                    <div>
                        <label htmlFor="password">Adgangskode</label>
                        <input 
                            type="password" 
                            name="password" 
                            ref={register({
                                required: "Nødvendig"
                            })} 
                        />
                        <ErrorMessage errors={errors} name={"name"}>
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

export default Form;