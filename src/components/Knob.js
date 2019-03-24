import React from "react";

export const Knob = ({ knobDetails, dispatch }) => {
  // I extracted the knobs into their own components so that they could contain their own state
  const { angle, cx, cy, r, uuid } = knobDetails;

  return (
    <g transform={`rotate(${angle} ${cx} ${cy})`}>
      <circle
        className="knob component"
        cx={cx}
        cy={cy}
        r={r}
        stroke="black"
        strokeWidth="1"
        fill="darkgrey"
        onClick={() =>
          dispatch({
            type: "SET_SELECTED_COMPONENT",
            selectedComponent: { uuid }
          })
        }
      />
      <line
        x1={cx}
        y1={cy + r / 4}
        x2={cx}
        y2={cy + (3.25 * r) / 4}
        stroke="black"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </g>
  );
};
