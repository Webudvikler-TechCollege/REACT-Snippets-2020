import React from 'react';
import Styles from "./Nav.module.scss";
import routes from '../../Router/routes';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav className={Styles.sitenav}>
            <ul>
                {/* Mapper routes array */}
                {routes.map(({path, name, display, subnav}) => (
                    /* Hvis display er sat til true... */
                    display ? (
                        <li key={name}>
                            <Link to={path}>{name}</Link>
                            {/* Hvis der er en undermenu */}
                            {subnav ? (
                                <ul>
                                    {/* Mapper sub menuer */}
                                    {subnav.map(({name, path}) => (
                                        <li key={name}>
                                            <Link to={path}>{name}</Link>
                                        </li>
                                    ))}
                                </ul>
                            ): null}
                        </li>
                    ) : null
                ))}
            </ul>
        </nav>
    )
}

export default NavBar;