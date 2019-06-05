import React from "react";
import { FootSwitch } from "./Parts/FootSwitch";
import { Knob } from "./Parts/Knob";
import { Switch } from "./Parts/Switch";
import { useStateValue } from "../StateProvider";

export const Knobs = ({ knobs }) => {
  const [, dispatch] = useStateValue();
  return (
    <>
      {knobs.map(knob => {
        switch (knob.type) {
          case "FootSwitch":
            return (
              <FootSwitch
                key={knob.id}
                footSwitchDetails={knob}
                dispatch={dispatch}
              />
            );
          case "Knob":
            return (
              <Knob key={knob.id} knobDetails={knob} dispatch={dispatch} />
            );
          case "Switch":
            return (
              <Switch key={knob.id} switchDetails={knob} dispatch={dispatch} />
            );
          default:
            return null;
        }
      })}
    </>
  );
};
