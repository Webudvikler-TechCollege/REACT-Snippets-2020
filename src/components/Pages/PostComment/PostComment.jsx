// Henter react
import React from "react";
// Henter form hook fra NPM React-hook-form
import { useForm, ErrorMessage } from "react-hook-form";
import useAuth from "../../Auth/Auth";
import useFetch from "use-http";
import { Link } from "react-router-dom";

const Form = (props) => {
  const { handleSubmit, register, errors } = useForm();
  const { user, loggedIn } = useAuth();
  const { data, post, error } = useFetch("/bakeonline/comments", {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    cachePolicy: "no-cache"
  });

  const onSubmit = handleSubmit((values) => {
    console.log(values);
    if (!loggedIn) {
        return;
    }

    let urlencoded = new URLSearchParams();
    urlencoded.append("title", values.title.trim());
    urlencoded.append("comment", values.comment.trim());
    urlencoded.append("user_id", user.user_id);
    urlencoded.append("product_id", 1);
    urlencoded.append("active", 1);

    post(null, urlencoded);
  });

  return (
    <div>
      <h3>Indsend kommentar</h3>
      {!loggedIn && (
          <>
                <h5>Du skal være logget ind!</h5>
                <Link to="/login">Tryk her for at komme til login</Link>
          </>
      )}
      <section>
        <form onSubmit={onSubmit}>
          <div>
            <label htmlFor="title">Titel:</label>
            <input
              name="title"
              ref={register({
                required: "Nødvendig",
              })}
            />
            <ErrorMessage errors={errors} name={"title"}>
              {({ message }) => <span>{message}</span>}
            </ErrorMessage>
          </div>
          <br />

          <div>
            <label htmlFor="password">Kommentar</label>
            <textarea
              name="comment"
              ref={register({
                required: "Nødvendig",
              })}
            />
            <ErrorMessage errors={errors} name={"comment"}>
              {({ message }) => <span>{message}</span>}
            </ErrorMessage>
          </div>

          <button type="submit">Send</button>
          <br />
          {props.children}
        </form>
        {!!data && (
            <>
                <h2>Tillykke du har nu kommenteret</h2>
                <p>Svar fra serveren:</p>
                <pre>{JSON.stringify(data, null, 2)}</pre>
            </>
        )}
        {!!error && (
            <>
                <h2>Uuups noget gik galt</h2>
                <p>Svar fra serveren:</p>
                <pre>{JSON.stringify(error, null, 2)}</pre>
            </>
        )}
      </section>
    </div>
  );
};

export default Form;
