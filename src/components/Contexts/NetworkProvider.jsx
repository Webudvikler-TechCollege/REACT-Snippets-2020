import React, { Suspense, useMemo } from "react";
import { Provider } from "use-http";
import useAuth from "../Auth/Auth";

export default function NetworkProvider({ children }) {
  const { user, loggedIn } = useAuth();
  const options = useMemo(() => {
    const madeOptions = {
      timeout: 10000,
      retries: 2,
      retryDelay: 3000,
    };
    if(loggedIn && user) {
      madeOptions.headers = {
        Authorization: 'Bearer ' + user.access_token
      }
    }
    return madeOptions;
  }, [user, loggedIn]);
  return (
    <Provider url="https://api.mediehuset.net" options={options}>
      <Suspense fallback="Loading...">{children}</Suspense>
    </Provider>
  );
}
