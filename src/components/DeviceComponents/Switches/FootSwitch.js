import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const FootSwitchDiv = styled(motion.div)`
  position: absolute;
  width: ${props => props.width + "px"};
  height: ${props => props.height + "px"};
  left: ${props => props.left + "px"};
  top: ${props => props.top + "px"};
`;

export const FootSwitch = React.memo(
  ({ footSwitchDetails, builder, patcher, dispatch }) => {
    const { cx, cy, r, id } = footSwitchDetails;
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
      whileTap: { scale: 0.8 }
    };

    return (
      <FootSwitchDiv
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
              className="footSwitch component"
              cx={r}
              cy={r}
              r={r}
              fill="darkgrey"
              onClick={() => console.log("Footswitch clicked.")}
            />
          </g>
        </svg>
      </FootSwitchDiv>
    );
  }
);