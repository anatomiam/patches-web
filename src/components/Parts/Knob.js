import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const KnobDiv = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  touch-action: none;
  width: ${props => props.width + "px"};
  height: ${props => props.height + "px"};
  left: ${props => props.left + "px"};
  top: ${props => props.top + "px"};
`;

export const Knob = React.memo(
  ({ knobDetails, builder, patcher, dispatch }) => {
    const { angle, cx, cy, r, id, color } = knobDetails;
    const [angleAdjust, setAngleAdjust] = useState(0);
    const sharedProps = {
      onTapStart: event => {
        dispatch({
          type: "SET_SELECTED_COMPONENT_ID",
          id
        });
      }
    };
    const builderProps = {};
    const patcherProps = {
      animate: {
        rotate: angle + angleAdjust
      },
      initial: false,
      whileHover: { scale: 1.1 },
      whileTap: { scale: 0.95 },
      onPan: (event, info) => {
        setAngleAdjust(info.offset.y);
      },
      onPanEnd: () => {
        dispatch({
          type: "SET_SELECTED_COMPONENT_ANGLE",
          angle: angle + angleAdjust,
          knobId: id
        });
      }
    };
    // set document width and height to 100x100,
    // or get width and height of svg bounding box from user
    // svg center as center of document,
    // export with flatten transform

    return (
      <KnobDiv
        width={r * 2}
        height={r * 2}
        left={cx - r}
        top={cy - r}
        {...sharedProps}
        {...(builder ? builderProps : {})}
        {...(patcher ? patcherProps : {})}
      >
        <svg width={r * 2} height={r * 2}>
          <g>
            <circle
              className="knob component"
              cx={r}
              cy={r}
              r={r}
              fill={color}
            />
            <line
              x1={r}
              y1={r / 4}
              x2={r}
              y2={(3.25 * r) / 4}
              stroke="black"
              strokeWidth="1"
              strokeLinecap="round"
            />
          </g>
        </svg>
      </KnobDiv>
    );
  }
);
