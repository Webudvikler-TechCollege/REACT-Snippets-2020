import React from "react";
import { HotKeys } from "react-hotkeys";

export default function Keyhandler(props) {
  const keyMap = {
    MOVE_UP: "control+alt+f",
  };

  const handlers = {
    MOVE_UP: (event) => console.log("Move up hotkey called!"),
  };

  return (
    <HotKeys keyMap={keyMap} handlers={handlers}>
      {props.children} <input />
    </HotKeys>
  );
}
