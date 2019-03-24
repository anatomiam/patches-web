import React from "react";
import { useStateValue } from "../App";
import _ from "lodash";

export const ComponentInfo = () => {
  const [{ pedal }, dispatch] = useStateValue();
  const selectedComponent = pedal.components.knobs.find(element => {
    return element.uuid === pedal.selectedComponent.uuid;
  });

  return selectedComponent ? (
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
          min="0"
          max="360"
          value={selectedComponent.angle}
          onChange={event => {
            dispatch({
              type: "UPDATE_KNOB_ANGLE",
              uuid: selectedComponent.uuid,
              angle: parseInt(event.target.value)
            });
          }}
          className="slider"
          id="myRange"
        />
      </div>
    </div>
  ) : (
    <h3>Select a Component</h3>
  );
};
