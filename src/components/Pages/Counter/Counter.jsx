import React, { useState } from "react";

// how to use the state hook in a React function component
function Counter(props) {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button
        onClick={() =>
          setCount((oldCount) => {
            const newCount = oldCount + 1;
            if (typeof props.onClick === "function") {
              props.onClick(newCount);
            }
            return newCount;
          })
        }
      >
        Click me
      </button>
    </div>
  );
}

export default Counter;
