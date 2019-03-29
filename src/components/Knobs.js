import React from "react";
import { FootSwitch } from "./FootSwitch";
import { Knob } from "./Knob";
import { Switch } from "./Switch";
import { useStateValue } from "../StateProvider";

export const Knobs = () => {
  const [{ pedal }, dispatch] = useStateValue();

  const { knobs } = pedal.components;
  return (
    <>
      {knobs.map(knob => {
        switch (knob.type) {
          case "FootSwitch":
            return (
              <FootSwitch
                key={knob.uuid}
                footSwitchDetails={knob}
                dispatch={dispatch}
              />
            );
          case "Knob":
            return (
              <Knob key={knob.uuid} knobDetails={knob} dispatch={dispatch} />
            );
          case "Switch":
            return (
              <Switch
                key={knob.uuid}
                switchDetails={knob}
                dispatch={dispatch}
              />
            );
          default:
            return null;
        }
      })}
    </>
  );
};
