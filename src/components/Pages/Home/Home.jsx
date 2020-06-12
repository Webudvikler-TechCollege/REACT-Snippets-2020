import React, { useState, useEffect } from 'react';

// Click Hook Example
const ClickHook = props => {
    const [count, setCount] = useState(0);

    useEffect(() => {
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
