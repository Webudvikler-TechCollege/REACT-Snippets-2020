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
    login(values.username.trim(), values.password.trim());
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
              minLength: { message: "too short", value: 2 },
              maxLength: { message: "too long", value: 30 },
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
              minLength: { message: "too short", value: 2 },
              maxLength: { message: "too long", value: 30 },
            })}
          />
          <ErrorMessage errors={errors} name={"password"}>
            {({ message }) => <span>{message}</span>}
          </ErrorMessage>
        </div>
        <button type="submit">Send</button>
        <button
          onClick={() => {
            // crude hack to force a login session
            window.sessionStorage.setItem("user_id", 1337);
            window.sessionStorage.setItem("token", 1337);
            window.location.reload();
          }}
        >
          force login!
        </button>
      </form>
    );
  }
  return (
    <div>
      <button onClick={logout}>Logout</button>
      {/* {JSON.stringify(user, null, 2)} */}
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
};

export default Login;
