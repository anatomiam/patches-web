import { PropTypes } from "prop-types";
import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

const IndicatorDiv = styled(motion.div)`
  position: absolute;
  width: ${props => props.width + "px"};
  height: ${props => props.height + "px"};
  left: ${props => props.left + "px"};
  top: ${props => props.top + "px"};
`;

export const Indicator = React.memo(
  ({
    indicatorDetails,
    currentPage,
    setSelectedComponentId,
    builderProps,
    ...rest
  }) => {
    const { cx, cy, r, color, id } = indicatorDetails;
    const patcherProps = {
      onTapStart: () => {
        setSelectedComponentId(id);
      }
    };

    return (
      <IndicatorDiv
        width={r * 2}
        height={r * 2}
        left={cx - r}
        top={cy - r}
        {...builderProps}
        {...(currentPage === "patcher" ? patcherProps : {})}
        {...rest}
      >
        <svg width={r * 2} height={r * 2}>
          <g>
            <circle
              className="indicator component"
              cx={r}
              cy={r}
              r={r}
              fill={color}
              onClick={() => console.log("Indicator clicked.")}
            />
          </g>
        </svg>
      </IndicatorDiv>
    );
  }
);

Indicator.propTypes = {
  indicatorDetails: PropTypes.object,
  builderProps: PropTypes.object,
  currentPage: PropTypes.string,
  setSelectedComponentId: PropTypes.func
};
Indicator.displayName = "Indicator";
