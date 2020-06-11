// Henter react
import React from 'react';
// Henter form hook fra NPM React-hook-form
import { useForm, ErrorMessage } from "react-hook-form";

const Form = props => {
    // Deklarerer hook til login
    const { handleSubmit, register, errors } = useForm();

    // Deklarerer handle til login knap
    const onSubmit = values => {
        // Deklarerer headers
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        
        // Deklarerer user data (username + password)
        let urlencoded = new URLSearchParams();
        urlencoded.append("username", values.username);
        urlencoded.append("password", values.password);
        
        // Deklarerer request options
        let requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: urlencoded,
          redirect: 'follow'
        };
        
        // Kalder login i API - returnerer array med token hvis true
        fetch("https://api.mediehuset.net/token", requestOptions)
          .then(response => response.json())
          .then(result => {
              // Hvis bruger findes
              if(result.access_token) {

                // Log resultat
                console.log(result);

                // Smid token og user id ned i session storage 
                // Så kan vi tilgå dem derfra indtil at browser vinduet lukkes 
                sessionStorage.setItem('token', result.access_token);
                sessionStorage.setItem('user_id', result.user_id);
                
                // Tjek om token er sat i session storage
                if(sessionStorage.getItem('token')) {

                    // Hent kommentarer med authorization header
                    const fetchHeaders = new Headers();
                    fetchHeaders.append("Accept", "application/json");
                    fetchHeaders.append("Authorization", "Bearer " + sessionStorage.getItem('token'));

                    // Deklarerer request options
                    let fetchOptions = {
                        method: 'GET',
                        headers: fetchHeaders,
                        redirect: 'follow'
                    };                    

                    //Fetcher comment endpoint med requestOptions
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
                        <ErrorMessage errors={errors} name={"username"}>
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
                        <ErrorMessage errors={errors} name={"password"}>
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