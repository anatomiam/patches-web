import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const SwitchDiv = styled(motion.div)`
  position: absolute;
  width: ${props => props.width + "px"};
  height: ${props => props.height + "px"};
  left: ${props => props.left + "px"};
  top: ${props => props.top + "px"};
`;

export const Switch = React.memo(({ switchDetails, dispatch }) => {
  // TODO better names for these variables
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
  // const numberOfPositions = 3;
  // const positions = {
  //   2: [x - _width / 4, x + _width / 4],
  //   3: [x - _width / 4, x, x + _width / 4],
  //   4: [x - _width / 4, x - _width / 8, x + _width / 8, x + _width / 4]
  // };
  // const position = positions[numberOfPositions];

  return (
    <SwitchDiv width={_width} height={height} left={_cx} top={_cy}>
      <svg width={_width} height={height}>
        <g>
          <rect
            className="component"
            x={0}
            y={0}
            width={_width}
            height={height}
            fill="silver"
            ry={ry}
            rx={rx}
          />
          <circle
            className="knob component"
            cx={rx}
            cy={rx}
            r={r}
            fill="darkgrey"
            onClick={() =>
              dispatch({
                type: "SET_SELECTED_COMPONENT",
                id
              })
            }
          />
        </g>
      </svg>
    </SwitchDiv>
  );
});
