import React, { useState } from "react";

export const AddSwitchForm = React.memo(({ dispatch }) => {
  const [cx, setCx] = useState(0);
  const [cy, setCy] = useState(0);
  const [width, setWidth] = useState(0);
  const [description, setDescription] = useState("");

  return (
    <form
      onSubmit={event => {
        event.preventDefault();

        dispatch({
          type: "ADD_KNOB",
          knob: {
            type: "Switch",
            cx,
            cy,
            width,
            description
          }
        });

        setCx(0);
        setCy(0);
        setWidth(0);
        setDescription("");
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
        <label htmlFor="description">Description </label>
        <input
          id="description"
          placeholder="Set description"
          name="set-description"
          type="text"
          onChange={event => {
            setDescription(event.target.value);
          }}
          value={description}
        />
      </p>
      <p>
        <input type="submit" value="Add Switch" />
      </p>
    </form>
  );
});
