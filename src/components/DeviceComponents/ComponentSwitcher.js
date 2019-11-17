import React from "react";
import { FootSwitch } from "./Switches/FootSwitch";
import { Knob } from "./Knobs/Knob";
import { Switch } from "./Switches/Switch";
import { Indicator } from "./Switches/Indicator";
import { uniqueId } from "lodash";
import { PropTypes } from "prop-types";
import {
  setSelectedComponentId,
  setSelectedComponentPosition,
  updateCx,
  updateCy,
  updateDescription,
  deleteKnob
} from "../../state/Actions/Actions";
import { connect } from "react-redux";

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
  setSelectedComponentId: PropTypes.func,
  setSelectedComponentPosition: PropTypes.func,
  updateCx: PropTypes.func,
  updateCy: PropTypes.func,
  deleteKnob: PropTypes.func
};

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
  deleteKnob
};

export default connect(mapStateToProps, mapDispatchToProps)(ComponentSwitcher);
