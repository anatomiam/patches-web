import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { PropTypes } from "prop-types";

const SwitchDiv = styled(motion.div)`
  position: absolute;
  width: ${props => props.width + "px"};
  height: ${props => props.height + "px"};
  left: ${props => props.left + "px"};
  top: ${props => props.top + "px"};
`;

export const Switch = React.memo(
  ({
    switchDetails,
    builder,
    patcher,
    setSelectedComponentId,
    setSelectedComponentPosition
  }) => {
    // TODO better names for these variables
    const { cx, cy, width, id, position, steps } = switchDetails;
    const x = cx;
    const y = cy;
    const _width = width;

    const height = _width / 2;
    const rx = height / 2;
    const ry = _width / 2;
    const _cx = x - _width / 2;
    const _cy = y - height / 2;
    const r = rx * 0.75;
    const numberOfPositions = steps;
    const switchPositions = {
      2: [r * 1.3, width - r * 1.3],
      3: [r * 1.3, width / 2, width - r * 1.3]
    };
    const switchPosition = switchPositions[numberOfPositions];

    const sharedProps = {
      onTapStart: event => {
        setSelectedComponentId(id);
      }
    };
    const builderProps = {};
    const patcherProps = {
      whileHover: { scale: 1.1 },
      whileTap: { scale: 0.95 },
      onTap: event => {
        setSelectedComponentPosition(id, (position + 1) % numberOfPositions);
      }
    };

    return (
      <SwitchDiv
        width={_width}
        height={height}
        left={_cx}
        top={_cy}
        {...sharedProps}
        {...(builder ? builderProps : {})}
        {...(patcher ? patcherProps : {})}
      >
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
              cx={switchPosition[position]}
              cy={rx}
              r={r}
              fill="darkgrey"
              onClick={() => setSelectedComponentId(id)}
            />
          </g>
        </svg>
      </SwitchDiv>
    );
  }
);

Switch.propTypes = {
  switchDetails: PropTypes.object,
  builder: PropTypes.bool,
  patcher: PropTypes.bool,
  setSelectedComponentId: PropTypes.func,
  setSelectedComponentPosition: PropTypes.func
};
