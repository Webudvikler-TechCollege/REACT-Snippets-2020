import React from 'react';
import Styles from "./Header.module.scss";


export default function Header(props) {
    return (
        <header className={Styles.siteheader}>
            <h1>My React Site</h1>
            {props.children}
        </header>
    )
}