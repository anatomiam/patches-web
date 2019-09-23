import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Popup } from "semantic-ui-react";
import { DeleteSelectedKnobButton } from "../Forms/DeleteSelectedKnobButton";
import { UpdateCxButton } from "../Forms/UpdateCxButton";

const KnobDiv = styled(motion.div)`
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
  ({ knobDetails, builder, patcher, drag, dispatch }) => {
    const { angle, cx, cy, r, id, color } = knobDetails;
    const [angleAdjust, setAngleAdjust] = useState(0);
    const sharedProps = {
      onTapStart: event => {
        dispatch({
          type: "SET_SELECTED_COMPONENT_ID",
          id
        });
      }
    };
    const builderProps = {
      drag: drag,
      onDrag: (event, info) => {
        console.log(info.offset.x + cx);
      },
      onDragEnd: (event, info) => {
        dispatch({
          type: "UPDATE_CX",
          selectedComponentId: id,
          cx: info.offset.x + cx
        });
        dispatch({
          type: "UPDATE_CY",
          selectedComponentId: id,
          cy: info.offset.y + cy
        });
      }
    };
    const patcherProps = {
      animate: {
        rotate: angle + angleAdjust
      },
      initial: false,
      whileHover: { scale: 1.1 },
      whileTap: { scale: 0.95 },
      onPan: (event, info) => {
        setAngleAdjust(info.offset.y);
      },
      onPanEnd: () => {
        dispatch({
          type: "SET_SELECTED_COMPONENT_ANGLE",
          angle: angle + angleAdjust,
          knobId: id
        });
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
          flexDirection: "row",
          borderRadius: "2px",
          opacity: 1,
          padding: "6px"
        }}
        trigger={
          <KnobDiv
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
        <UpdateCxButton dispatch={dispatch} knobId={id} cx={cx} />
        <DeleteSelectedKnobButton dispatch={dispatch} knobId={id} />
      </Popup>
    );
  }
);
