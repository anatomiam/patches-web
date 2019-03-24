import React from "react";
import { Knob } from "./Knob";
import { useStateValue } from "../StateProvider";

export const Knobs = () => {
  const [{ pedal }, dispatch] = useStateValue();

  const { knobs } = pedal.components;
  return (
    <>
      {knobs.map(knob => {
        return <Knob key={knob.uuid} knobDetails={knob} dispatch={dispatch} />;
      })}
    </>
  );
};
