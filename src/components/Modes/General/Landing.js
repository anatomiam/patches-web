import React from "react";
import "../../../index.css";
import styled from "styled-components";
import { motion } from "framer-motion";

const Pedal = styled(motion.div)`
  width: 300px;
  height: 400px;
  border: 2px solid steelblue;
  border-radius: 3%;
`;

const Knob = styled(motion.div)`
  position: relative;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  top: 50px;
  left: 50px;
`;

const Landing = () => {
  const transition = {
    min: 0,
    max: 300,
    restDelta: 10,
    power: 0,
    // Snap calculated target to nearest 50 pixels
    modifyTarget: target => Math.round(target / 100) * 100
  };
  return (
    <Pedal>
      <Knob
        dragTransition={transition}
        // whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.8 }}
        drag
      >
        <svg width="50px" height="50px">
          <circle cx={25} cy={25} r={25} stroke="red" fill="none" />
        </svg>
      </Knob>
    </Pedal>
  );
};

export default Landing;
