import React from "react";
import { FootSwitch } from "./Parts/FootSwitch";
import { Knob } from "./Parts/Knob";
import { Switch } from "./Parts/Switch";

export const Knobs = React.memo(({ knobs, dispatch }) => {
  return (
    <>
      {knobs.map(knob => {
        switch (knob.type) {
          case "FootSwitch":
            return (
              <FootSwitch
                key={Math.random()}
                footSwitchDetails={knob}
                dispatch={dispatch}
              />
            );
          case "Knob":
            return (
              <Knob key={Math.random()} knobDetails={knob} dispatch={dispatch} />
            );
          case "Switch":
            return (
              <Switch key={Math.random()} switchDetails={knob} dispatch={dispatch} />
            );
          default:
            return null;
        }
      })}
    </>
  );
});
