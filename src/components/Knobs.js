import React from "react";
import { useStateValue } from "../App";

export const Knobs = () => {
  const [{ pedal }, dispatch] = useStateValue();

  const { knobs } = pedal.components;
  return (
    <>
      {knobs.map(knob => {
        return (
          <g
            key={knob.uuid}
            transform={`rotate(${knob.angle} ${knob.cx} ${knob.cy})`}
          >
            <circle
              className="knob component"
              cx={knob.cx}
              cy={knob.cy}
              r={knob.r}
              stroke="black"
              strokeWidth="1"
              fill="darkgrey"
              onClick={() =>
                dispatch({
                  type: "setSelectedComponent",
                  selectedComponent: knob
                })
              }
            />
            <line
              x1={knob.cx}
              y1={knob.cy + knob.r / 4}
              x2={knob.cx}
              y2={knob.cy + (3.25 * knob.r) / 4}
              stroke="black"
              strokeWidth="1"
              strokeLinecap="round"
            />
          </g>
        );
      })}
    </>
  );
};
