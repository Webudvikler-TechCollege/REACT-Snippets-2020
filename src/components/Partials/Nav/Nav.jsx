import React from "react";
import Styles from "./Nav.module.scss";
import routes from "../../Router/routes";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className={Styles.sitenav}>
      <ul>
        {/* Mapper routes array */}
        {routes.map(({ path, name, display, subnav }) => {
          const exact = path === "/" ? true : false;
          return (
            /* Hvis display er sat til true... */
            display ? (
              <li key={name}>
                <NavLink
                  to={path}
                  exact={exact}
                  activeClassName={Styles.activeNavLink}
                >
                  {name}
                </NavLink>
                {/* Hvis der er en undermenu */}
                {subnav ? (
                  <ul>
                    {/* Mapper sub menuer */}
                    {subnav.map(({ name, path }) => (
                      <li key={name}>
                        <NavLink to={path}>{name}</NavLink>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ) : null
          );
        })}
      </ul>
    </nav>
  );
};

export default NavBar;
