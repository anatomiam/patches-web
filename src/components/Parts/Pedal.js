import React from "react";
import { Knobs } from "../Knobs";
import styled from "styled-components";
import { motion } from "framer-motion";

const PedalDiv = styled(motion.div)`
  position: relative;
  width: ${props => props.width + "px"};
  height: ${props => props.height + "px"};
  background-color: ${props => props.color};
`;

export const Pedal = React.memo(({ knobs, width, height, color, dispatch }) => {
  return (
    <PedalDiv width={width} height={height} color={color}>
      <Knobs knobs={knobs} dispatch={dispatch} width={width} height={height} />
    </PedalDiv>
  );
});
