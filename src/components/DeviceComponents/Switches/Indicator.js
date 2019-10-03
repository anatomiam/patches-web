import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { PropTypes } from "prop-types";

const IndicatorDiv = styled(motion.div)`
  position: absolute;
  width: ${props => props.width + "px"};
  height: ${props => props.height + "px"};
  left: ${props => props.left + "px"};
  top: ${props => props.top + "px"};
`;

export const Indicator = React.memo(
  ({ indicatorDetails, builder, patcher, dispatch }) => {
    const { cx, cy, r, color, id } = indicatorDetails;
    const sharedProps = {
      onTapStart: event => {
        dispatch({
          type: "SET_SELECTED_COMPONENT_ID",
          id
        });
      }
    };
    const builderProps = {};
    const patcherProps = {};

    return (
      <IndicatorDiv
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
  builder: PropTypes.bool,
  patcher: PropTypes.bool,
  dispatch: PropTypes.func
};
