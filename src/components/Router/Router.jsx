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
            {/* Route til 404 Not found */}
            <Route render={() => <h1>Siden findes ikke</h1>} />
        </Switch>
    );
}