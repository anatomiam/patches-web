import React from "react";
import { ComponentSwitcher } from "../ComponentSwitcher";
import styled from "styled-components";
import { uniqueId } from "lodash";
import { motion } from "framer-motion";

const PedalDiv = styled(motion.div)`
  position: relative;
  width: ${props => props.width + "px"};
  height: ${props => props.height + "px"};
  background-color: ${props => props.color};
`;

export const Pedal = React.memo(
  ({
    knobs,
    width,
    height,
    color,
    builder,
    patcher,
    drag,
    tapKnobsIn,
    dispatch
  }) => {
    const tapKnobsProps = {
      onTap: (event, info) => {
        dispatch({
          type: "ADD_KNOB",
          knob: {
            type: "Knob",
            cx: event.offsetX,
            cy: event.offsetY,
            r: 20,
            position: 0,
            color: "#A9A9A9",
            description: "Knob",
            id: uniqueId("knob-")
          }
        });
      }
    };

    return (
      <PedalDiv
        width={width}
        height={height}
        color={color}
        {...(tapKnobsIn ? tapKnobsProps : {})}
      >
        <ComponentSwitcher
          knobs={knobs}
          dispatch={dispatch}
          width={width}
          height={height}
          builder={builder}
          patcher={patcher}
          drag={drag}
          tapKnobsIn={tapKnobsIn}
        />
      </PedalDiv>
    );
  }
);
