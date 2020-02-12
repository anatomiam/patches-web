import React, { useState } from "react";

import { PropTypes } from "prop-types";
import { motion } from "framer-motion";
import styled from "styled-components";

const KnobDiv = styled(motion.div)`
  pointer-events: ${props => (props.disableKnobs ? "none" : "")};
  position: absolute;
  border-radius: 50%;
  touch-action: none;
  outline: ${props => (props.drag ? "solid 5px orange" : "")};
  outline-offset: ${props => (props.drag ? "1px" : "")};
  width: ${props => props.width + "px"};
  height: ${props => props.height + "px"};
  left: ${props => props.left + "px"};
  top: ${props => props.top + "px"};
`;

export const Knob = React.memo(
  ({
    knobDetails,
    currentPage,
    tapKnobsIn,
    sharedProps,
    builderProps,
    setSelectedComponentId,
    setSelectedComponentPosition,
    // patcherProps,
    ...rest
  }) => {
    const { id, cx, cy, r, color, position } = knobDetails;
    const [angleAdjust, setAngleAdjust] = useState(0);
    const patcherProps = {
      animate: {
        rotate: position + angleAdjust
      },
      initial: false,
      whileHover: { scale: 1.1 },
      whileTap: { scale: 0.95 },
      onPan: (event, info) => {
        setAngleAdjust(info.offset.y);
      },
      onPanEnd: () => {
        // knob angle will always be between 0 and 360 degrees
        setSelectedComponentPosition(
          id,
          (((position + angleAdjust) % 360) + 360) % 360
        );
        setSelectedComponentId(id);
      }
    };
    // set document width and height to 100x100,
    // or get width and height of svg bounding box from user
    // svg center as center of document,
    // export with flatten transform

    return (
      <KnobDiv
        disableKnobs={tapKnobsIn.isActive}
        width={r * 2}
        height={r * 2}
        left={cx - r}
        top={cy - r}
        {...sharedProps}
        {...builderProps}
        {...(currentPage === "patcher" ? patcherProps : {})}
        {...rest} // This accounts for the props passed in by SemanticUI's Popup
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

Knob.propTypes = {
  knobDetails: PropTypes.object,
  currentPage: PropTypes.string,
  setSelectedComponentId: PropTypes.func,
  setSelectedComponentPosition: PropTypes.func,
  tapKnobsIn: PropTypes.object,
  sharedProps: PropTypes.object,
  builderProps: PropTypes.object,
  patcherProps: PropTypes.object
};

Knob.displayName = "Knob";
