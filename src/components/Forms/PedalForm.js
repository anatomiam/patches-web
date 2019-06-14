import React, { useState } from "react";

export const PedalForm = React.memo(({ width, height, name, dispatch }) => {
  // arbitrarily starting local state variables with '_'
  const [_width, setWidth] = useState(width);
  const [_height, setHeight] = useState(height);
  const [_name, setName] = useState(name);

  return (
    <>
      <form
        onSubmit={event => {
          event.preventDefault();
          dispatch({
            type: "SET_PEDAL_DETAILS",
            pedalDetails: {
              name: _name,
              height: _height,
              width: _width
            }
          });
        }}
      >
        <p>
          <label htmlFor="name">Name </label>
          <input
            id="name"
            placeholder="Set Name"
            name="set-name"
            type="text"
            onChange={event => {
              setName(event.target.value);
            }}
            value={_name}
          />
        </p>
        <p>
          <label htmlFor="width">Width </label>
          <input
            id="width"
            placeholder="Set Width"
            name="set-width"
            type="number"
            onChange={event => {
              setWidth(parseFloat(event.target.value));
            }}
            value={_width}
          />
        </p>
        <p>
          <label htmlFor="height">Height </label>
          <input
            id="height"
            placeholder="Set Height"
            name="set-height"
            type="number"
            onChange={event => {
              setHeight(parseFloat(event.target.value));
            }}
            value={_height}
          />
        </p>
        <p>
          <input type="submit" value="Submit Dimensions" />
        </p>
      </form>
    </>
  );
});
