import {
  deleteKnob,
  setSelectedComponentId,
  setSelectedComponentPosition,
  updateColor,
  updateCx,
  updateCy,
  updateDescription,
  updatePosition,
  updateR,
  updateSteps,
  updateWidth
} from "../../state/Actions/Actions";

import { FootSwitch } from "./Switches/FootSwitch";
import { Indicator } from "./Switches/Indicator";
import { Knob } from "./Knobs/Knob";
import { PropTypes } from "prop-types";
import React from "react";
import { Switch } from "./Switches/Switch";
import { connect } from "react-redux";
import { uniqueId } from "lodash";

const ComponentSwitcher = React.memo(props => {
  const {
    knobs,
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
  } = props;
  return (
    <>
      {knobs.map(knob => {
        switch (knob.type) {
          case "FootSwitch":
            return (
              <FootSwitch
                key={uniqueId("footswitch-key")}
                footSwitchDetails={knob}
                setSelectedComponentId={setSelectedComponentId}
                builder={builder}
                patcher={patcher}
              />
            );
          case "Indicator":
            return (
              <Indicator
                key={uniqueId("indicator-key")}
                indicatorDetails={knob}
                setSelectedComponentId={setSelectedComponentId}
                builder={builder}
                patcher={patcher}
              />
            );
          case "Knob":
            return (
              <Knob
                key={uniqueId("knob-key-")}
                knobDetails={knob}
                builder={builder}
                setSelectedComponentId={setSelectedComponentId}
                setSelectedComponentPosition={setSelectedComponentPosition}
                updateCx={updateCx}
                updateCy={updateCy}
                updateDescription={updateDescription}
                updatePosition={updatePosition}
                updateSteps={updateSteps}
                updateR={updateR}
                updateWidth={updateWidth}
                updateColor={updateColor}
                deleteKnob={deleteKnob}
                patcher={patcher}
                drag={drag}
                tapKnobsIn={tapKnobsIn}
              />
            );
          case "Switch":
            return (
              <Switch
                key={uniqueId("switch-key-")}
                switchDetails={knob}
                builder={builder}
                patcher={patcher}
                setSelectedComponentPosition={setSelectedComponentPosition}
                setSelectedComponentId={setSelectedComponentId}
              />
            );
          default:
            return null;
        }
      })}
    </>
  );
});

ComponentSwitcher.propTypes = {
  knobDetails: PropTypes.object,
  builder: PropTypes.bool,
  patcher: PropTypes.bool,
  drag: PropTypes.bool,
  tapKnobsIn: PropTypes.bool,
  knobs: PropTypes.array,
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
  deleteKnob: PropTypes.func
};
ComponentSwitcher.displayName = "ComponentSwitcher";
const mapStateToProps = state => {
  // need to reconcile bw builder and patcher
  return {
    builderState: state.builderState
  };
};

const mapDispatchToProps = {
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
};

export default connect(mapStateToProps, mapDispatchToProps)(ComponentSwitcher);
