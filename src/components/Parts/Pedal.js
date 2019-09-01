import React from "react";
import { Knobs } from "../Knobs";

export const Pedal = React.memo(({ knobs, width, height, color, dispatch }) => {
  return (
    <svg className="pedal" width={width} height={height}>
      <rect
        width={width}
        height={height}
        style={{
          fill: color,
          strokeWidth: 2,
          stroke: "rgb(0,0,0)"
        }}
      />
      <Knobs knobs={knobs} dispatch={dispatch} />
    </svg>
  );
});
