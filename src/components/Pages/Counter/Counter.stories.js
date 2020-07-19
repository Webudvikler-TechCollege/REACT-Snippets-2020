import React from "react";
// import { Button } from '@storybook/react/demo'
// import { Button as Counter } from '@storybook/react/demo'
import Counter from "./Counter";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

// export default {
//   title: "Counter",
//   component: Counter,
//   decorators: [
//     // (storyFn) => <div style={{ backgroundColor: "yellow" }}>{storyFn()}</div>,
//     (Story) => (
//       <div style={{ backgroundColor: "#c3c3c3", padding: "1rem" }}>
//         <Story />
//       </div>
//     ),
//   ],
// };

// export const withBorder = (props) => (
//   <Counter onClick={action("[clicked] New count:")} {...props} />
// );
// withBorder.story = {
//   decorators: [
//     (Story) => (
//       <div style={{ border: "5px solid red" }}>
//         <Story />
//       </div>
//     ),
//     // (storyFn) => <div style={{ border: "5px solid red" }}>{storyFn()}</div>,
//   ],
// };

storiesOf("UI|Counter", module)
  .add("default", () => <Counter />)
  // .add("custom onclick", () => (
  //   <Counter onClick={action("[clicked] New count:")} />
  // ));
  .add("custom onclick", () => (
    <div style={{ backgroundColor: "#c3c3c3", padding: "1rem" }}>
      <Counter onClick={action("[clicked] New count:")} />
    </div>
  ));
// {
//   const WithBorder = withBorder;
//   storiesOf("UI|Counter", module)
//     .add("default", () => <Counter />)
//     .add("custom onclick", () => (
//       <WithBorder onClick={action("[clicked] New count:")} />
//     ));
// }
