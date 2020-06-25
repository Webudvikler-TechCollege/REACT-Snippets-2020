// Henter react
import React from "react";
// Henter form hook fra NPM React-hook-form
import { useForm, ErrorMessage } from "react-hook-form";
import useAuth from "../../Auth/Auth";

const Login = (props) => {
  // Deklarerer hook til login form
  const { handleSubmit, register, errors } = useForm();
  const { login, logout, user, loggedIn } = useAuth();
  console.log("Login -> user", user);

  const onSubmit = handleSubmit((values) => {
    login(values.username, values.password);
  });

  if (!loggedIn) {
    return (
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="username">Brugernavn:</label>
          <input
            type="text"
            name="username"
            id="username"
            ref={register({
              required: "Nødvendig",
            })}
          />
          <ErrorMessage errors={errors} name={"username"}>
            {({ message }) => <span>{message}</span>}
          </ErrorMessage>
        </div>
        <div>
          <label htmlFor="password">Adgangskode:</label>
          <input
            type="password"
            name="password"
            id="password"
            ref={register({
              required: "Nødvendig",
            })}
          />
          <ErrorMessage errors={errors} name={"password"}>
            {({ message }) => <span>{message}</span>}
          </ErrorMessage>
        </div>
        <button type="submit">Send</button>
      </form>
    );
  } else {
    return (
      <div>
        <button onClick={logout}>Logout</button>
      </div>
    );
  }
};

export default Login;
