// Henter react
import React from 'react';
// Henter form hook fra NPM React-hook-form
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message"

const Form = props => {
    const { handleSubmit, register, errors } = useForm();

    const onSubmit = values => {
        //console.log(values);
        let postHeaders = new Headers();
        postHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        postHeaders.append("Accept", "application/json");
        postHeaders.append("Authorization", "Bearer " + sessionStorage.getItem('token'));

        let urlencoded = new URLSearchParams();
        urlencoded.append("title", values.title);
        urlencoded.append("comment", values.comment);
        urlencoded.append("user_id", values.user_id);
        urlencoded.append("product_id", values.product_id);
        urlencoded.append("active", 1);
        
        let requestOptions = {
          method: 'POST',
          headers: postHeaders,
          body: urlencoded,
          redirect: 'follow'
        };
        
        
        fetch("https://api.mediehuset.net/bakeonline/comments", requestOptions)
            .then(response => response.text())
            .then(result => console.dir(result))
            .catch(error => console.log('error', error));
    }

    return (
        <div>
            <h3>Indsend kommentar</h3>
            <section>
                <form onSubmit={handleSubmit(onSubmit)}>
                <input type="hidden" name="user_id" value="1" ref={register({  })} />                    
                <input type="hidden" name="product_id" value="1" ref={register({  })}  />                    
                    <div>
                        <label htmlFor="title">Titel:</label>
                        <input 
                            name="title" 
                            ref={register({
                                required: "Nødvendig",
                            })} 
                        />
                        <ErrorMessage errors={errors} name={"title"}>
                            {({message}) => <span>{message}</span>}
                        </ErrorMessage>
                    </div><br />

                    <div>
                        <label htmlFor="password">Kommentar</label>
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

export default Form;