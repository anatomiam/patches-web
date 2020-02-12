import {
  deleteKnob,
  updateColor,
  updateCx,
  updateCy,
  updateDescription,
  updatePosition,
  updateR,
  updateSteps,
  updateWidth
} from "../../state/Actions/Actions";

import { DeleteSelectedKnobButton } from "../Forms/Builder/DeleteSelectedKnobButton";
import { Popup } from "semantic-ui-react";
import { PropTypes } from "prop-types";
import React from "react";
import { UpdateColorInput } from "../Forms/Builder/UpdateColorInput";
import { UpdateCxInput } from "../Forms/Builder/UpdateCxInput";
import { UpdateCyInput } from "../Forms/Builder/UpdateCyInput";
import { UpdateDescriptionInput } from "../Forms/Builder/UpdateDescriptionInput";
import { UpdatePositionInput } from "../Forms/Builder/UpdatePositionInput";
import { UpdateRInput } from "../Forms/Builder/UpdateRInput";
import { UpdateStepsInput } from "../Forms/Builder/UpdateStepsInput";
import { UpdateWidthInput } from "../Forms/Builder/UpdateWidthInput";
import { connect } from "react-redux";
import { gridLock } from "../../helpers/Helpers";

const BuilderWrapper = React.memo(
  ({
    builderState,
    knobDetails,
    drag,
    currentPage,
    updateCx,
    updateCy,
    updateDescription,
    updatePosition,
    updateSteps,
    updateR,
    updateWidth,
    updateColor,
    children,
    deleteKnob,
    width
  }) => {
    // pass in values for width/height/left/top explicitly
    // this should take care of components like Switch
    const {
      position,
      cx,
      cy,
      r,
      id,
      color,
      description,
      steps
      // width
    } = knobDetails;
    const { tapKnobsIn } = builderState;
    // const [angleAdjust, setAngleAdjust] = useState(0);
    const sharedProps = {
      // onTap: event => {
      // setSelectedComponentId(id);
      // }
    };
    const builderProps = {
      drag: drag,
      onDrag: (event, info) => {
        console.log(info.offset.x + cx);
      },
      onDragEnd: (event, info) => {
        updateCx(id, gridLock(info.offset.x + cx, 5));
        updateCy(id, gridLock(info.offset.y + cy, 5));
      }
    };

    if (currentPage === "builder") {
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
          trigger={React.cloneElement(children, {
            tapKnobsIn: tapKnobsIn,
            sharedProps: sharedProps,
            builderProps: builderProps
          })}
          on="click"
        >
          {cx ? (
            <UpdateCxInput updateCx={updateCx} knobId={id} cx={cx} />
          ) : null}
          {cy ? (
            <UpdateCyInput updateCy={updateCy} knobId={id} cy={cy} />
          ) : null}
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
    } else {
      return React.cloneElement(children, {
        tapKnobsIn: tapKnobsIn,
        sharedProps: sharedProps,
        currentPage: currentPage
      });
    }
  }
);

const mapStateToProps = state => {
  // need to reconcile bw builder and patcher
  return {
    builderState: state.builderState,
    sharedState: state.sharedState
  };
};
const mapDispatchToProps = {
  updateCx,
  updateCy,
  updateDescription,
  updatePosition,
  updateSteps,
  updateR,
  updateWidth,
  updateColor,
  deleteKnob
};
BuilderWrapper.propTypes = {
  knobDetails: PropTypes.object,
  builderState: PropTypes.object,
  drag: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number,
  top: PropTypes.number,
  left: PropTypes.number,
  tapKnobsIn: PropTypes.object,
  currentPage: PropTypes.string,
  setSelectedComponentId: PropTypes.func,
  setSelectedComponentPosition: PropTypes.func,
  updateCx: PropTypes.func,
  updateCy: PropTypes.func,
  updateDescription: PropTypes.func,
  updatePosition: PropTypes.func,
  updateSteps: PropTypes.func,
  updateR: PropTypes.func,
  updateWidth: PropTypes.func,
  updateColor: PropTypes.func,
  children: PropTypes.object,
  deleteKnob: PropTypes.func
};
BuilderWrapper.displayName = "Knob";
export default connect(mapStateToProps, mapDispatchToProps)(BuilderWrapper);
