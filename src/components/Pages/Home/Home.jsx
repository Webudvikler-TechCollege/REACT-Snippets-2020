import React, { useState, useEffect } from 'react';

// Click Hook Example
const ClickHook = props => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        // Når React mounter dette component
        // vil useEffect gemme den originale title
        // som vores app har.
        const originalTitle = document.title;

        // Hvis vi returnere en funktion (kaldes clean-up funktion)
        // vil React køre denne når dette componentet un-mounter
        return () => document.title = originalTitle;
    } 
    /* Et tomt array fortæller React at denne effect kun skal køres
       når componentet bliver mounted og unmounted --> */, []) 

    useEffect(() => {
        // Når react Render vil denne funktion blive kørt.
        document.title = `Du har klikket ${count} gange`;
    })

    return (
        <div>
            <h1>Click Hook</h1>
            <section>
                <button onClick={() => setCount(count+1)}>Click me</button>
                <p>Du har klikket {count} gange.</p>
            </section>
        </div>
    )
}

const Container = props => {
    return (
        <ClickHook />
    )
}

export default Container;
