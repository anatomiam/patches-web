import ComponentSwitcher from "../ComponentSwitcher";
import { PropTypes } from "prop-types";
import React from "react";
import { defaultDeviceComponents } from "../../../state/Data";
import { motion } from "framer-motion";
import styled from "styled-components";
import { uniqueId } from "lodash";

const PedalDiv = styled(motion.div)`
  position: relative;
  min-width: ${props => props.width + "px"};
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
    addKnob
  }) => {
    const tapKnobsProps = {
      className: "crosshair",
      onTap: event => {
        addKnob({
          ...defaultDeviceComponents[tapKnobsIn.knobType],
          cx: event.offsetX,
          cy: event.offsetY,
          id: uniqueId(`${tapKnobsIn.knobType}-`)
        });
      }
    };

    return (
      <PedalDiv
        width={width}
        height={height}
        color={color}
        {...(tapKnobsIn.isActive ? tapKnobsProps : {})}
      >
        <ComponentSwitcher
          knobs={knobs}
          width={width}
          height={height}
          builder={builder}
          patcher={patcher}
          drag={drag}
        />
      </PedalDiv>
    );
  }
);

Pedal.propTypes = {
  knobs: PropTypes.array,
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string,
  builder: PropTypes.bool,
  patcher: PropTypes.bool,
  drag: PropTypes.bool,
  tapKnobsIn: PropTypes.object,
  addKnob: PropTypes.func
};
Pedal.displayName = "Pedal";
