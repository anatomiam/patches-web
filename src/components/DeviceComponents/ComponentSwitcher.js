import {
  setSelectedComponentId,
  setSelectedComponentPosition
} from "../../state/Actions/Actions";

import BuilderWrapper from "./BuilderWrapper";
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
    drag,
    setSelectedComponentId,
    setSelectedComponentPosition,
    sharedState
  } = props;
  return (
    <>
      {knobs.map(knob => {
        switch (knob.type) {
          case "FootSwitch":
            return (
              <BuilderWrapper
                key={uniqueId("footswitch-key-")}
                currentPage={sharedState.currentPage}
                knobDetails={knob}
                width={knob.r * 2}
                drag={drag}
              >
                <FootSwitch
                  setSelectedComponentId={setSelectedComponentId}
                  footSwitchDetails={knob}
                />
              </BuilderWrapper>
            );
          case "Indicator":
            return (
              <BuilderWrapper
                key={uniqueId("indicator-key-")}
                currentPage={sharedState.currentPage}
                knobDetails={knob}
                width={knob.r * 2}
                drag={drag}
              >
                <Indicator
                  indicatorDetails={knob}
                  setSelectedComponentId={setSelectedComponentId}
                />
              </BuilderWrapper>
            );
          case "Knob":
            return (
              <BuilderWrapper
                key={uniqueId("knob-key-")}
                currentPage={sharedState.currentPage}
                knobDetails={knob}
                width={knob.r * 2}
                drag={drag}
              >
                <Knob
                  setSelectedComponentId={setSelectedComponentId}
                  setSelectedComponentPosition={setSelectedComponentPosition}
                  knobDetails={knob}
                />
              </BuilderWrapper>
            );
          case "Switch":
            return (
              <BuilderWrapper
                key={uniqueId("switch-key-")}
                currentPage={sharedState.currentPage}
                knobDetails={knob}
                width={knob.width}
                drag={drag}
              >
                <Switch
                  switchDetails={knob}
                  setSelectedComponentPosition={setSelectedComponentPosition}
                  setSelectedComponentId={setSelectedComponentId}
                />
              </BuilderWrapper>
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
  drag: PropTypes.bool,
  knobs: PropTypes.array,
  setSelectedComponentId: PropTypes.func,
  setSelectedComponentPosition: PropTypes.func,
  sharedState: PropTypes.object
};
ComponentSwitcher.displayName = "ComponentSwitcher";
const mapStateToProps = state => {
  // need to reconcile bw builder and patcher
  return {
    builderState: state.builderState,
    sharedState: state.sharedState
  };
};

const mapDispatchToProps = {
  setSelectedComponentId,
  setSelectedComponentPosition
};

export default connect(mapStateToProps, mapDispatchToProps)(ComponentSwitcher);
