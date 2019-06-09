import React, { useState } from "react";

export const Knob = React.memo(({ knobDetails, dispatch }) => {
  const [dragging, setDragging] = useState(false);
  const [angleAdjust, setAngleAdjust] = useState(0);
  const [mouseDownPosition, setMouseDownPosition] = useState(0);
  const { angle, cx, cy, r, id } = knobDetails;

  return (
    <g transform={`rotate(${angle + angleAdjust} ${cx} ${cy})`}>
      <circle
        className="knob component"
        cx={cx}
        cy={cy}
        r={r}
        stroke="black"
        strokeWidth="1"
        fill="darkgrey"
        onMouseDown={event => {
          dispatch({
            type: "SET_SELECTED_COMPONENT_ID",
            id
          });
          dispatch({
            type: "SET_SELECTED_COMPONENT_ANGLE",
            angle: angle + angleAdjust
          });
          setDragging(true);
          setMouseDownPosition(event.clientY + angleAdjust);
        }}
        onMouseMove={
          dragging
            ? event => {
                setAngleAdjust(mouseDownPosition - event.clientY);
                // dispatch({
                //   type: "SET_SELECTED_COMPONENT_ANGLE",
                //   angle: angle + angleAdjust
                // });
              }
            : null
        }
        onMouseUp={() => {
          setDragging(false);
          dispatch({
            type: "SET_SELECTED_COMPONENT_ANGLE",
            angle: angle + angleAdjust
          });
        }}
        onMouseOut={() => {
          if (dragging) {
            setDragging(false);
            dispatch({
              type: "SET_SELECTED_COMPONENT_ANGLE",
              angle: angle + angleAdjust
            });
          }
        }}
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
});
