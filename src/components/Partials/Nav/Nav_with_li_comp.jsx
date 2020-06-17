import React from 'react';
import Styles from "./Nav.module.scss";
import routes from '../../Router/routes';
import { NavLink } from 'react-router-dom';

// Deklarerer komponent til liste (<li>)
const Li = props => {
    // Deconstructor props
    const {name, exact, path } = props;

    // Returnerer html med NavLink
    return (
        <li>
            <NavLink to={path} exact={exact}>
                {name}
            </NavLink>
        </li>
    );
}

// Exporter
export default function Nav(props) {
    return (
        <nav className={Styles.sitenav}>
            <ul>
                {/* Looper routes array */} 
                {routes.map((navelement, i) => {
                    // Hvis .display er true
                    if(navelement.display) {
                        return (
                            <Li key={navelement.name}
                                {...navelement}
                            />
                        );
                    } else {
                        // Return null hvis .display er false
                        return null;
                    }
                    
                })}
            </ul>
        </nav>
    );
}