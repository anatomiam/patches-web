import React from "react";
import _ from "lodash";

export const ComponentInfo = React.memo(
  ({
    knobs,
    selectedComponentId,
    selectedComponentAngle,
    pedalDetails,
    dispatch
  }) => {
    // default to showing pedal info
    const selectedComponent = selectedComponentId
      ? knobs.find(knob => {
          return knob.id === selectedComponentId;
        })
      : pedalDetails;
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
      </div>
    );
  }
);
