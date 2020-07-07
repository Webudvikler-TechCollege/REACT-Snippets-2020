import React, { useState, createContext, useMemo, useCallback } from "react";
import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { useEffect } from "react";
import JwtDecode from "jwt-decode";

const AuthContext = createContext({
  loggedIn: false,
  user: null,
  login: () => {},
  logout: () => {},
});

export function AuthProvider(props) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Forsøger at tjekke sessionStorage
    // efter brugeroplysninger
    // DETTE ER ET DUMT HACK/FIX OG BØR IKKE BRUGES
    // Lad vær at få brugeroplysninger fra sessionstorage på
    // denne måde. Mange ting kan gå galt som: udløbet token,
    // gammelt data, utroværdig kilde osv.
    // Prøv følgende i consollen i browseren:
    // 1. Skriv: sessionStorage.setItem("user_id", "1337")
    // 2. Skriv: sessionStorage.setItem("token", "123")
    // 3. Tryk på opdater knappen
    // 4. ??
    // 5. profit. Kommet ind på priviligerede sider uden login

    if (!user) {
      const recoveredUser = sessionStorage.getItem("user");
      if (typeof recoveredUser === "string") {
        setUser(JSON.parse(recoveredUser));
      }
    }
  }, [user, setUser]);

  const login = useCallback(
    (username, password) => {
      // Deklarerer headers
      const headers = new Headers();
      headers.append("Content-Type", "application/x-www-form-urlencoded");

      // Deklarerer user data (username + password)
      const urlencodedBody = new URLSearchParams();
      urlencodedBody.append("username", username);
      urlencodedBody.append("password", password);

      // Deklarerer request options
      let requestOptions = {
        method: "POST",
        headers: headers,
        body: urlencodedBody,
        redirect: "follow",
      };

      // Kalder login i API - returnerer array med token hvis true
      fetch("https://api.mediehuset.net/token", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          // console.log("login -> result", result);
          // Hvis bruger findes
          if (result.access_token) {
            const decodedTokenInfo = JwtDecode(result.access_token);
            const newUser = { ...result, tokenInfo: decodedTokenInfo };
            setUser(newUser);
            // Smid token og user id ned i session storage
            // Så kan vi tilgå dem derfra indtil at browser vinduet lukkes
            // sessionStorage.setItem("token", result.access_token);
            // sessionStorage.setItem("user_id", result.user_id);
            sessionStorage.setItem("user", JSON.stringify(newUser));
          }
          return result;
        })
        .catch((err) => {
          console.error(err);
          return err;
        });
    },
    [setUser]
  );

  const logout = useCallback(() => {
    setUser(null);
    sessionStorage.clear();
  }, [setUser]);

  const value = useMemo(() => {
    const loggedIn = !!user;

    return {
      loggedIn,
      user,
      login,
      logout,
    };
  }, [user, login, logout]);

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}

export default function useAuth() {
  return useContext(AuthContext);
}

export function AuthRoute(props) {
  const { loggedIn } = useAuth();
  if (!loggedIn) return <Redirect to="/login" />;
  return <Route {...props} />;
}
