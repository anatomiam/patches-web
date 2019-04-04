import React from "react";
import { Knobs } from "../Knobs";
import { useStateValue } from "../../StateProvider";

export const Pedal = () => {
  const [{ pedal }] = useStateValue();

  const { height, width } = pedal.dimensions;
  return (
    <>
      <h2>{pedal.name}</h2>
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
        <Knobs />
      </svg>
    </>
  );
};
