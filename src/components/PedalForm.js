import React, { useState } from "react";
import { useStateValue } from "../StateProvider";

export const PedalForm = () => {
  const [{ pedal }, dispatch] = useStateValue();

  const [width, setWidth] = useState(pedal.dimensions.width);
  const [height, setHeight] = useState(pedal.dimensions.height);
  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        dispatch({
          type: "SET_DIMENSIONS",
          dimensions: {
            width,
            height
          }
        });
      }}
    >
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
          value={width}
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
          value={height}
        />
      </p>
      <p>
        <input type="submit" value="Submit Dimensions" />
      </p>
    </form>
  );
};
