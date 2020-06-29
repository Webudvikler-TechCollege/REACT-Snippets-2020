import React, { useMemo } from "react";
import { Provider } from "use-http";
import useAuth from "../Auth/Auth";

export default function NetworkProvider({ children }) {
  const { user, loggedIn } = useAuth();

  const options = useMemo(() => {
    return {
      timeout: 10000,
      retries: 2,
      retryDelay: 3000,
      interceptors: {
        request: async ({ options, url, path, route }) => {
          if (loggedIn && user) {
            options.headers.Authorization = "Bearer " + user.access_token;
          }
          // options.headers["Access-Control-Allow-Origin"] = "*";
          return options;
        },
        response: async ({ response }) => {
          // note: `response.data` is equivalent to `await response.json()`
          return response; // returning the `response` is important
        },
      },
    };
  }, [user, loggedIn]);

  return (
    <Provider url="https://api.mediehuset.net" options={options}>
      {children}
    </Provider>
  );
}
