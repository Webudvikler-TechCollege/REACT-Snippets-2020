import React from "react";
import { Switch, Route } from "react-router-dom";
import routes from "./routes";
import { AuthRoute } from "../Auth/Auth";

// const MakeRoute = (route) => {
//   if (route.priviliged) {
//     return (
//       <AuthRoute
//         key={route.path}
//         path={route.path}
//         exact={route.exact}
//         component={route.component}
//       />
//     );
//   }
//   return (
//     <Route
//       key={route.path}
//       path={route.path}
//       exact={route.exact}
//       component={route.component}
//     />
//   );
// };

export default function Router(props) {
  return (
    <Switch>
      {routes.reduce((reducedRoutes, route) => {
        // reducedRoutes.push(
        //   MakeRoute(route)
        // );
        if (route.priviliged) {
          reducedRoutes.push(
            <AuthRoute
              key={route.path}
              path={route.path}
              exact={route.exact}
              component={route.component}
            />
          );
        } else {
          reducedRoutes.push(
            <Route
              key={route.path}
              path={route.path}
              exact={route.exact}
              component={route.component}
            />
          );
        }
        if (Array.isArray(route.subnav)) {
          route.subnav.forEach((subroute) => {
            if (subroute.priviliged) {
              reducedRoutes.push(
                <AuthRoute
                  key={subroute.path}
                  path={subroute.path}
                  exact={subroute.exact}
                  component={subroute.component}
                />
              );
            } else {
              reducedRoutes.push(
                <Route
                  key={subroute.path}
                  path={subroute.path}
                  exact={subroute.exact}
                  component={subroute.component}
                />
              );
            }
            // reducedRoutes.push(
            //   MakeRoute(subroute)
            // );
          });
        }
        return reducedRoutes;
      }, [])}
      <Route render={() => <h1>Siden findes ikke</h1>} />
    </Switch>
  );
}
