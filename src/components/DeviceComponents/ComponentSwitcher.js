import React from "react";
import { FootSwitch } from "./Switches/FootSwitch";
import { Knob } from "./Knobs/Knob";
import { Switch } from "./Switches/Switch";
import { uniqueId } from "lodash";

export const ComponentSwitcher = React.memo(
  ({ knobs, builder, patcher, drag, tapKnobsIn, dispatch }) => {
    return (
      <>
        {knobs.map(knob => {
          switch (knob.type) {
            case "FootSwitch":
              return (
                <FootSwitch
                  key={uniqueId("footswitch-key")}
                  footSwitchDetails={knob}
                  dispatch={dispatch}
                  builder={builder}
                  patcher={patcher}
                />
              );
            case "Knob":
              return (
                <Knob
                  key={uniqueId("knob-key-")}
                  knobDetails={knob}
                  dispatch={dispatch}
                  builder={builder}
                  patcher={patcher}
                  drag={drag}
                  tapKnobsIn={tapKnobsIn}
                />
              );
            case "Switch":
              return (
                <Switch
                  key={uniqueId("switch-key-")}
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
