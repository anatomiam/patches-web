import React from "react";

export const Switch = () => {
  const x = 75;
  const y = 170;
  const width = 30;
  const height = width / 2;
  const rx = height / 2;
  const ry = width / 2;
  const cx = x - width / 2;
  const cy = y - height / 2;
  const r = rx * 0.75;
  const numberOfPositions = 4;
  const positions = {
    2: [x - width / 4, x + width / 4],
    3: [x - width / 4, x, x + width / 4],
    4: [x - width / 4, x - width / 8, x + width / 8, x + width / 4]
  };
  const position = positions[numberOfPositions];

  return (
    <g transform={`rotate(${0} ${x} ${y})`}>
      <rect
        className="component"
        x={cx}
        y={cy}
        width={width}
        height={height}
        fill="silver"
        stroke="black"
        strokeWidth="1"
        ry={ry}
        rx={rx}
      />
      <circle
        className="knob component"
        cx={position[2]}
        cy={y}
        r={r}
        stroke="black"
        strokeWidth="1"
        fill="darkgrey"
        onClick={() => console.log("clicked!")}
      />
    </g>
  );
};
