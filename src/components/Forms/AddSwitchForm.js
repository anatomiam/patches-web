import React, { useState } from "react";
import { useStateValue } from "../../StateProvider";

export const AddSwitchForm = () => {
  const [, dispatch] = useStateValue();

  const [cx, setCx] = useState(0);
  const [cy, setCy] = useState(0);
  const [width, setWidth] = useState(0);
  const [label, setLabel] = useState("");

  return (
    <form
      onSubmit={event => {
        event.preventDefault();

        dispatch({
          type: "ADD_SWITCH",
          switch: {
            uuid: Math.random(),
            type: "Switch",
            cx,
            cy,
            width,
            label
          }
        });

        setCx(0);
        setCy(0);
        setWidth(0);
        setLabel("");
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
        <label htmlFor="r">Width </label>
        <input
          id="r"
          placeholder="Set Width"
          name="set-r"
          type="number"
          onChange={event => {
            setWidth(parseFloat(event.target.value));
          }}
          value={width}
        />
      </p>
      <p>
        <label htmlFor="label">Label </label>
        <input
          id="label"
          placeholder="Set label"
          name="set-label"
          type="text"
          onChange={event => {
            setLabel(event.target.value);
          }}
          value={label}
        />
      </p>
      <p>
        <input type="submit" value="Add Switch" />
      </p>
    </form>
  );
};
