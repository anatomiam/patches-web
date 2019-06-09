import React from "react";

export const Switch = React.memo(({ switchDetails, dispatch }) => {
  const { cx, cy, width, id } = switchDetails;
  const x = cx;
  const y = cy;
  const _width = width;

  const height = _width / 2;
  const rx = height / 2;
  const ry = _width / 2;
  const _cx = x - _width / 2;
  const _cy = y - height / 2;
  const r = rx * 0.75;
  const numberOfPositions = 3;
  const positions = {
    2: [x - _width / 4, x + _width / 4],
    3: [x - _width / 4, x, x + _width / 4],
    4: [x - _width / 4, x - _width / 8, x + _width / 8, x + _width / 4]
  };
  const position = positions[numberOfPositions];

  return (
    <g transform={`rotate(${0} ${x} ${y})`}>
      <rect
        className="component"
        x={_cx}
        y={_cy}
        width={_width}
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
        onClick={() =>
          dispatch({
            type: "SET_SELECTED_COMPONENT",
            id
          })
        }
      />
    </g>
  );
});
