import { PropTypes } from "prop-types";
import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

const FootSwitchDiv = styled(motion.div)`
  position: absolute;
  width: ${props => props.width + "px"};
  height: ${props => props.height + "px"};
  left: ${props => props.left + "px"};
  top: ${props => props.top + "px"};
`;

export const FootSwitch = React.memo(
  ({ footSwitchDetails, builder, patcher, setSelectedComponentId }) => {
    const { cx, cy, r, id } = footSwitchDetails;
    const sharedProps = {
      onTapStart: () => {
        setSelectedComponentId(id);
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

FootSwitch.propTypes = {
  footSwitchDetails: PropTypes.object,
  builder: PropTypes.bool,
  patcher: PropTypes.bool,
  setSelectedComponentId: PropTypes.func
};
FootSwitch.displayName = "FootSwitch";
