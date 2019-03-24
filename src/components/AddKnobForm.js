import React, { useState } from "react";
import { useStateValue } from "../App";

export const AddKnobForm = ({ saveKnob }) => {
  const [{ pedal }, dispatch] = useStateValue();

  const [cx, setCx] = useState(0);
  const [cy, setCy] = useState(0);
  const [r, setR] = useState(0);
  const [angle, setAngle] = useState(0);

  return (
    <form
      onSubmit={event => {
        event.preventDefault();

        dispatch({
          type: "ADD_KNOB",
          knob: {
            uuid: Math.random(),
            type: "Knob",
            cx: cx,
            cy: cy,
            r: r,
            angle: angle
          }
        });

        setCx(0);
        setCy(0);
        setR(0);
        setAngle(0);
      }}
    >
      <p>
        <label htmlFor="cx">CX </label>
        <input
          id="cx"
          placeholder="Set cx"
          name="set-cx"
          type="number"
          onChange={event => {
            setCx(parseFloat(event.target.value));
          }}
          value={cx}
        />
      </p>
      <p>
        <label htmlFor="cy">CY </label>
        <input
          id="cy"
          placeholder="Set cy"
          name="set-cy"
          type="number"
          onChange={event => {
            setCy(parseFloat(event.target.value));
          }}
          value={cy}
        />
      </p>
      <p>
        <label htmlFor="r">R </label>
        <input
          id="r"
          placeholder="Set r"
          name="set-r"
          type="number"
          onChange={event => {
            setR(parseFloat(event.target.value));
          }}
          value={r}
        />
      </p>
      <p>
        <label htmlFor="angle">Angle </label>
        <input
          id="angle"
          placeholder="Set angle"
          name="set-angle"
          type="number"
          onChange={event => {
            setAngle(parseFloat(event.target.value));
          }}
          value={angle}
        />
      </p>
      <p>
        <input type="submit" value="Add Knob" />
      </p>
    </form>
  );
};
