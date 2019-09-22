import React from "react";
import { FootSwitch } from "./FootSwitch";
import { Knob } from "./Knob";
import { Switch } from "./Switch";

export const Knobs = React.memo(
  ({ knobs, builder, patcher, drag, dispatch }) => {
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
                  builder={builder}
                  patcher={patcher}
                />
              );
            case "Knob":
              return (
                <Knob
                  key={Math.random()}
                  knobDetails={knob}
                  dispatch={dispatch}
                  builder={builder}
                  patcher={patcher}
                  drag={drag}
                />
              );
            case "Switch":
              return (
                <Switch
                  key={Math.random()}
                  switchDetails={knob}
                  dispatch={dispatch}
                  builder={builder}
                  patcher={patcher}
                />
              );
            default:
              return null;
          }
        })}
      </>
    );
  }
);
