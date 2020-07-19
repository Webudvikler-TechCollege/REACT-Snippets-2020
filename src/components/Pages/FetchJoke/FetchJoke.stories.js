import React from "react";
// import { Button } from '@storybook/react/demo'
// import { Button as Counter } from '@storybook/react/demo'
import FetchJoke from "./FetchJoke";
// import { storiesOf } from "@storybook/react";

export default {
  title: "FetchJoke",
  // component: FetchJoke,
  decorators: [
    // (storyFn) => <div style={{ backgroundColor: "yellow" }}>{storyFn()}</div>,
    (Story) => (
      <div style={{ backgroundColor: "#c3c3c3", padding: "1rem" }}>
        <Story />
      </div>
    ),
  ],
};

export const withSjov = () => <FetchJoke>Hello Button</FetchJoke>;
export const withBallade = () => <FetchJoke>Hello Button</FetchJoke>;
export const withText = () => <FetchJoke>Hello Button</FetchJoke>;
withText.story = {
  decorators: [
    (Story) => (
      <div style={{ border: "5px solid red" }}>
        <Story />
      </div>
    ),
    // (storyFn) => <div style={{ border: "5px solid red" }}>{storyFn()}</div>,
  ],
};
export const withEmoji = () => (
  <FetchJoke>
    {/* <span role="img" aria-label="so cool">
      😀 😎 👍 💯
    </span> */}
  </FetchJoke>
);

// storiesOf("UI|FetchJoke", module)
//   .add("default", () => (
//     <FetchJoke />
//     // <Panel panels={panels} actions={{ onSelect, toggleVisibility, togglePosition }} selectedPanel="test2" />
//   ))
//   // .add('no panels', () => <Panel panels={{}} actions={{ onSelect, toggleVisibility, togglePosition }} />);
//   .add(
//     "no panels",
//     () => <FetchJoke />
//     // <Panel panels={{}} actions={{ onSelect, toggleVisibility, togglePosition }} />
//   );
