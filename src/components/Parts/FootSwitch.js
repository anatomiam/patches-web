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

export const FootSwitch = React.memo(({ footSwitchDetails, dispatch }) => {
  const { cx, cy, r } = footSwitchDetails;

  return (
    <FootSwitchDiv width={r * 2} height={r * 2} left={cx - r} top={cy - r}>
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
});
