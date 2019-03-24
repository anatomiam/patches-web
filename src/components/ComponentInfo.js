import React from "react";
import { useStateValue } from "../App";
import _ from "lodash";

export const ComponentInfo = () => {
  const [{ pedal }, dispatch] = useStateValue();

  const { selectedComponent } = pedal;

  const components = Object.entries(selectedComponent);
  console.log(components);
  return (
    <>
      {_.map(selectedComponent, (value, key) => {
        return (
          <p key={Math.random()}>
            <strong>{key}</strong>: {value}
          </p>
        );
      })}
    </>
  );
};
