import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { gridLock } from "../../../helpers/Helpers";
import { PropTypes } from "prop-types";

const PathDiv = styled(motion.div)`
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

export const CustomPath = React.memo(
  ({ knobDetails, builder, patcher, drag, tapKnobsIn, dispatch }) => {
    const [angleAdjust, setAngleAdjust] = useState(0);
    const { position, cx, cy, r, id } = knobDetails;
    const pathKnob = { wwidth: 100, hheight: 100 };
    const scale = 0.6;
    const pathh =
      "M53.853,10.347C51.29,10.098 48.71,10.098 46.147,10.347L44.878,16.526C42.421,16.902 40.014,17.547 37.699,18.449L33.51,13.733C31.166,14.799 28.931,16.089 26.837,17.586L28.827,23.572C26.888,25.125 25.125,26.888 23.572,28.827L17.586,26.837C16.089,28.931 14.799,31.166 13.733,33.51L18.449,37.699C17.547,40.014 16.902,42.421 16.526,44.878L10.347,46.147C10.098,48.71 10.098,51.29 10.347,53.853L16.526,55.122C16.902,57.579 17.547,59.986 18.449,62.301L13.733,66.49C14.799,68.834 16.089,71.069 17.586,73.163L23.572,71.173C25.125,73.112 26.888,74.875 28.827,76.428L26.837,82.414C28.931,83.911 31.166,85.201 33.51,86.267L37.699,81.551C40.014,82.453 42.421,83.098 44.878,83.474L46.147,89.653C48.71,89.902 51.29,89.902 53.853,89.653L55.122,83.474C57.579,83.098 59.986,82.453 62.301,81.551L66.49,86.267C68.834,85.201 71.069,83.911 73.163,82.414L71.173,76.428C73.112,74.875 74.875,73.112 76.428,71.173L82.414,73.163C83.911,71.069 85.201,68.834 86.267,66.49L81.551,62.301C82.453,59.986 83.098,57.579 83.474,55.122L89.653,53.853C89.902,51.29 89.902,48.71 89.653,46.147L83.474,44.878C83.098,42.421 82.453,40.014 81.551,37.699L86.267,33.51C85.201,31.166 83.911,28.931 82.414,26.837L76.428,28.827C74.875,26.888 73.112,25.125 71.173,23.572L73.163,17.586C71.069,16.089 68.834,14.799 66.49,13.733L62.301,18.449C59.986,17.547 57.579,16.902 55.122,16.526L53.853,10.347ZM50,42.032C54.398,42.032 57.968,45.602 57.968,50C57.968,54.398 54.398,57.968 50,57.968C45.602,57.968 42.032,54.398 42.032,50C42.032,45.602 45.602,42.032 50,42.032Z";

    const sharedProps = {
      onTapStart: () => {
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
          cx: gridLock(info.offset.x + cx, 5)
        });
        dispatch({
          type: "UPDATE_CY",
          selectedComponentId: id,
          cy: gridLock(info.offset.y + cy, 5)
        });
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
        dispatch({
          type: "SET_SELECTED_COMPONENT_POSITION",
          position: (((position + angleAdjust) % 360) + 360) % 360,
          knobId: id
        });
      }
    };
    // set document width and height to 100x100,
    // or get width and height of svg bounding box from user
    // svg center as center of document,
    // export with flatten transform

    return (
      <PathDiv
        disableKnobs={tapKnobsIn}
        width={r * 2}
        height={r * 2}
        left={cx - r}
        top={cy - r}
        {...sharedProps}
        {...(builder ? builderProps : {})}
        {...(patcher ? patcherProps : {})}
      >
        <svg>
          <g>
            <path
              transform={`translate(${cx -
                (pathKnob.wwidth / 2) * scale}, ${cy -
                (pathKnob.hheight / 2) * scale}), scale(${scale})`}
              d={pathh}
              className="knob component"
              style={{
                fill: "red",
                stroke: "silver",
                strokeWidth: 1
              }}
            />
            <line
              x1={cx}
              y1={cy + r / 4}
              x2={cx}
              y2={cy + (3.25 * r) / 4}
              stroke="black"
              strokeWidth="1"
              strokeLinecap="round"
            />
          </g>
        </svg>
      </PathDiv>
    );
  }
);

CustomPath.propTypes = {
  knobDetails: PropTypes.object,
  builder: PropTypes.bool,
  patcher: PropTypes.bool,
  drag: PropTypes.bool,
  tapKnobsIn: PropTypes.bool,
  dispatch: PropTypes.func
};
CustomPath.displayName = "CustomPath";
