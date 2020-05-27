import React from 'react';
import Styles from "./Nav.module.scss";
import routes from '../Router/routes';
import { NavLink } from 'react-router-dom';

const Li = props => {
    const {name, exact, path } = props;

    return (
        <li>
            <NavLink to={path} exact={exact}>
                {name}
            </NavLink>
        </li>
    );
}

export default function Nav(props) {
    return (
        <nav className={Styles.sitenav}>
            <ul>
                {routes.map((navelement, i) => {
                    //console.log(navelement);
                    return (
                        <Li key={navelement.name}
                            {...navelement}
                        />
                    );
                })}
            </ul>
        </nav>
    );
}