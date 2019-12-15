import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Popup } from "semantic-ui-react";
import { DeleteSelectedKnobButton } from "../../Forms/Builder/DeleteSelectedKnobButton";
import { UpdateCxInput } from "../../Forms/Builder/UpdateCxInput";
import { UpdateCyInput } from "../../Forms/Builder/UpdateCyInput";
import { UpdateDescriptionInput } from "../../Forms/Builder/UpdateDescriptionInput";
import { UpdatePositionInput } from "../../Forms/Builder/UpdatePositionInput";
import { UpdateStepsInput } from "../../Forms/Builder/UpdateStepsInput";
import { UpdateRInput } from "../../Forms/Builder/UpdateRInput";
import { UpdateWidthInput } from "../../Forms/Builder/UpdateWidthInput";
import { UpdateColorInput } from "../../Forms/Builder/UpdateColorInput";
import { gridLock } from "../../../helpers/Helpers";
import { PropTypes } from "prop-types";

const KnobDiv = styled(motion.div)`
  pointer-events: ${props => (props.disableKnobs ? "none" : "")};
  position: absolute;
  border-radius: 50%;
  touch-action: none;
  outline: ${props => (props.drag ? "solid 5px orange" : "")};
  outline-offset: ${props => (props.drag ? "1px" : "")};
  width: ${props => props.width + "px"};
  height: ${props => props.height + "px"};
  left: ${props => props.left + "px"};
  top: ${props => props.top + "px"};
`;

export const Knob = React.memo(
  ({
    knobDetails,
    builder,
    patcher,
    drag,
    tapKnobsIn,
    setSelectedComponentId,
    setSelectedComponentPosition,
    updateCx,
    updateCy,
    updateDescription,
    updatePosition,
    updateSteps,
    updateR,
    updateWidth,
    updateColor,
    deleteKnob
  }) => {
    const {
      position,
      cx,
      cy,
      r,
      id,
      color,
      description,
      steps,
      width
    } = knobDetails;
    const [angleAdjust, setAngleAdjust] = useState(0);
    const sharedProps = {
      onTap: event => {
        // setSelectedComponentId(id);
      }
    };
    const builderProps = {
      drag: drag,
      onDrag: (event, info) => {
        console.log(info.offset.x + cx);
      },
      onDragEnd: (event, info) => {
        updateCx(id, gridLock(info.offset.x + cx, 5));
        updateCy(id, gridLock(info.offset.y + cy, 5));
        setSelectedComponentId(id);
      }
    };
    const patcherProps = {
      animate: {
        rotate: position + angleAdjust
      },
      initial: false,
      whileHover: { scale: 1.1 },
      whileTap: { scale: 0.95 },
      onPan: (event, info) => {
        setAngleAdjust(info.offset.y);
      },
      onPanEnd: () => {
        // knob angle will always be between 0 and 360 degrees
        setSelectedComponentPosition(
          id,
          (((position + angleAdjust) % 360) + 360) % 360
        );
      }
    };
    // set document width and height to 100x100,
    // or get width and height of svg bounding box from user
    // svg center as center of document,
    // export with flatten transform

    return (
      <Popup
        size="mini"
        style={{
          display: "flex",
          flexDirection: "column",
          borderRadius: "2px",
          opacity: 1,
          padding: "6px"
        }}
        trigger={
          <KnobDiv
            disableKnobs={tapKnobsIn}
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
                  className="knob component"
                  cx={r}
                  cy={r}
                  r={r}
                  fill={color}
                />
                <line
                  x1={r}
                  y1={r / 4}
                  x2={r}
                  y2={(3.25 * r) / 4}
                  stroke="black"
                  strokeWidth="1"
                  strokeLinecap="round"
                />
              </g>
            </svg>
          </KnobDiv>
        }
        on="click"
      >
        {cx ? <UpdateCxInput updateCx={updateCx} knobId={id} cx={cx} /> : null}
        {cy ? <UpdateCyInput updateCy={updateCy} knobId={id} cy={cy} /> : null}
        {description ? (
          <UpdateDescriptionInput
            updateDescription={updateDescription}
            knobId={id}
            description={description}
          />
        ) : null}
        {position ? (
          <UpdatePositionInput
            updatePosition={updatePosition}
            knobId={id}
            position={position}
          />
        ) : null}
        {steps ? (
          <UpdateStepsInput
            updateSteps={updateSteps}
            knobId={id}
            steps={steps}
          />
        ) : null}
        {r ? <UpdateRInput updateR={updateR} knobId={id} r={r} /> : null}
        {width ? (
          <UpdateWidthInput
            updateWidth={updateWidth}
            knobId={id}
            width={width}
          />
        ) : null}
        {color ? (
          <UpdateColorInput
            updateColor={updateColor}
            knobId={id}
            color={color}
          />
        ) : null}
        <DeleteSelectedKnobButton deleteKnob={deleteKnob} knobId={id} />
      </Popup>
    );
  }
);

Knob.propTypes = {
  knobDetails: PropTypes.object,
  builder: PropTypes.bool,
  patcher: PropTypes.bool,
  drag: PropTypes.bool,
  tapKnobsIn: PropTypes.bool,
  setSelectedComponentId: PropTypes.func,
  setSelectedComponentPosition: PropTypes.func,
  updateCx: PropTypes.func,
  updateCy: PropTypes.func,
  updateDescription: PropTypes.func,
  updatePosition: PropTypes.func,
  updateSteps: PropTypes.func,
  updateR: PropTypes.func,
  deleteKnob: PropTypes.func
};
