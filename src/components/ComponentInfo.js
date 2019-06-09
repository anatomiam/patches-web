import React from "react";
import _ from "lodash";

export const ComponentInfo = React.memo(
  ({ knobs, selectedComponentId, selectedComponentAngle, dispatch }) => {
    const selectedComponent = knobs.find(knob => {
      return knob.id === selectedComponentId;
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
        <p>angle: </p>
        {selectedComponentAngle}
      </div>
    ) : (
      <h3>Select a Component</h3>
    );
  }
);
