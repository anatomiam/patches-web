import React from "react";
import { useStateValue } from "../App";
import _ from "lodash";

export const ComponentInfo = () => {
  const [{ pedal }, dispatch] = useStateValue();

  const { selectedComponent } = pedal;

  const components = Object.entries(selectedComponent);
  console.log(components);
  return (
    <div className="component-info">
      <div className="description">
        {_.map(selectedComponent, (value, key) => {
          return (
            <p key={Math.random()}>
              <strong>{key}</strong>: {value}
            </p>
          );
        })}
      </div>
      <div className="slider">
        <input
          style={{ transform: "rotate(270deg)" }}
          type="range"
          min="1"
          max="360"
          value="250"
          className="slider"
          id="myRange"
        />
      </div>
    </div>
  );
};
