import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './routes';

export default function Router(props) {
    return (
        <Switch>
            {routes.map(route => (
                <Route
                    key={route.path}
                    path={route.path}
                    exact={route.exact}
                    component={route.component}
                />
            ))}
            {routes.map(route => (
                route.subnav ? (
                    route.subnav?.map(subroute => (                    
                        <Route
                            key={subroute.path}
                            path={subroute.path}
                            exact={subroute.exact}
                            component={subroute.component}
                        />
                    ))
                ) : null
            ))}
            {/* Route til 404 Not found */}
            <Route render={() => <h1>Siden findes ikke</h1>} />
        </Switch>
    );
}