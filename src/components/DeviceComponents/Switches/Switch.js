import { PropTypes } from "prop-types";
import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

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
    currentPage,
    builderProps,
    setSelectedComponentId,
    setSelectedComponentPosition,
    ...rest
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

    const patcherProps = {
      whileHover: { scale: 1.1 },
      whileTap: { scale: 0.95 },
      onTap: () => {
        setSelectedComponentPosition(id, (position + 1) % numberOfPositions);
        setSelectedComponentId(id);
      }
    };

    return (
      <SwitchDiv
        width={_width}
        height={height}
        left={_cx}
        top={_cy}
        {...builderProps}
        {...(currentPage === "patcher" ? patcherProps : {})}
        {...rest}
      >
        <svg width={_width} height={height}>
          <g>
            <rect
              className="icon-pointer"
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
            />
          </g>
        </svg>
      </SwitchDiv>
    );
  }
);

Switch.propTypes = {
  switchDetails: PropTypes.object,
  builderProps: PropTypes.object,
  currentPage: PropTypes.string,
  setSelectedComponentId: PropTypes.func,
  setSelectedComponentPosition: PropTypes.func
};
Switch.displayName = "Switch";
