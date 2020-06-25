import React, {Suspense} from "react";
import { Provider } from "use-http";

export default function NetworkProvider({ children }) {
  const options = {
    // suspense: true, // B. can put `suspense: true` here too
  };
  return (
    <Provider url="https://api.mediehuset.net" options={options}>
      <Suspense fallback="Loading...">
        {children}
      </Suspense>
    </Provider>
  );
}
