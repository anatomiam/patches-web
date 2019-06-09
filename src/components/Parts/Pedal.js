import React from "react";
import { Knobs } from "../Knobs";

export const Pedal = React.memo(({ knobs, width, height, name, dispatch }) => {
  return (
    <>
      <h2>{name}</h2>
      <svg className="pedal" width="800" height="500">
        <rect
          width={width}
          height={height}
          style={{
            fill: "grey",
            strokeWidth: 2,
            stroke: "rgb(0,0,0)"
          }}
        />
        <Knobs knobs={knobs} dispatch={dispatch} />
      </svg>
    </>
  );
});
