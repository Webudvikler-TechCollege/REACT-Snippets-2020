import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './routes';

export default function Router(props) {
    return (
        <Switch>
            {routes.reduce((reducedRoutes, route) => {
                reducedRoutes.push(
                    <Route
                        key={route.path}
                        path={route.path}
                        exact={route.exact}
                        component={route.component}
                    />
                )
                if(Array.isArray(route.subnav)) {
                    route.subnav.forEach(subroute => {
                        reducedRoutes.push(
                            <Route
                                key={subroute.path}
                                path={subroute.path}
                                exact={subroute.exact}
                                component={subroute.component}
                            />
                        )
                    })
                }
                return reducedRoutes;            
            }, [])}
            <Route render={() => <h1>Siden findes ikke</h1>} />
        </Switch>
    )
}
