import React from "react";
import { useStateValue } from "../StateProvider";
import _ from "lodash";

export const ComponentInfo = ({ knobs }) => {
  const [{ localState }, dispatch] = useStateValue();
  const selectedComponent = knobs.find(knob => {
    return knob.id === localState.selectedComponent;
  });

  const selectedComponentsNewAngle = localState.updatedKnobAngles.find(knob => {
    return knob.id === localState.selectedComponent;
  });

  console.log(selectedComponentsNewAngle);

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
      {/* TODO  
        build a slider component that takes in min, max, step and start rotation props
        create helper functions that allow stepping through set rotation values
      */}
      <div className="slider">
        <input
          style={{ transform: "rotate(270deg)" }}
          type="range"
          min="0"
          max="360"
          value={
            selectedComponentsNewAngle ? selectedComponentsNewAngle.angle : 0
          }
          onChange={event => {
            dispatch({
              type: "UPDATE_KNOB_ANGLE",
              knobId: selectedComponent.id,
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
