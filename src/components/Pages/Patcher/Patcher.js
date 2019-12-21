import React from "react";
import { PropTypes } from "prop-types";
import AvailablePedals from "../../Forms/Shared/AvailablePedals";
import { AvailablePresets } from "../../Forms/Patcher/AvailablePresets";
// import { ComponentInfo } from "../../Forms/Shared/ComponentInfo";
import { PatchForm } from "../../Forms/Patcher/PatchForm";
import { Pedal } from "../../DeviceComponents/Body/Pedal";
import "../../../index.css";
import { CreatePresetButton } from "../../Forms/Patcher/CreatePresetButton";
import { UpdatePresetButton } from "../../Forms/Patcher/UpdatePresetButton";
import { Scaler } from "../General/Scaler";
import { connect } from "react-redux";
import {
  addKnob,
  selectPreset,
  setScale,
  setPatchDetails
} from "../../../state/Actions/Actions";
import {
  DivContainer,
  DivDetails,
  DivNotes,
  DivPedal,
  DivSubmit,
  DivPedalSelector,
  DivTools
} from "../PageStyles";

const Patcher = props => {
  const {
    pedals,
    presets,
    patcherState,
    addKnob,
    selectPreset,
    setScale,
    setPatchDetails
  } = props;
  const { width, height, color } = patcherState.pedalDetails;
  const {
    builder,
    knobs,
    scale,
    tapKnobsIn,
    patchDetails,
    selectedComponentId,
    pedalDetails,
    selectedComponentPosition
  } = patcherState;

  const pedalPresets = presets.filter(preset => {
    return preset.pedal.id === patcherState.pedalDetails.id;
  });

  return (
    <DivContainer>
      <DivPedal scale={scale}>
        <Pedal
          knobs={knobs}
          width={width}
          height={height}
          color={color}
          addKnob={addKnob}
          tapKnobsIn={tapKnobsIn}
          patcher
        />
      </DivPedal>
      <DivTools>
        <DivPedalSelector>
          <AvailablePedals pedals={pedals} />
          <AvailablePresets
            presets={pedalPresets}
            selectPreset={selectPreset}
          />
        </DivPedalSelector>
        <Scaler scale={scale} setScale={setScale} />
        <DivNotes>
          <PatchForm
            builder={builder}
            pedalId={pedalDetails.id}
            patchDetails={patchDetails}
            setPatchDetails={setPatchDetails}
            knobs={knobs}
            selectedComponentId={selectedComponentId}
          />
        </DivNotes>
        {/* <DivDetails>
          <ComponentInfo
            knobs={knobs}
            selectedComponentId={selectedComponentId}
            selectedComponentPosition={selectedComponentPosition}
            pedalDetails={patcherState.pedalDetails}
          />
        </DivDetails> */}
        <DivSubmit>
          <CreatePresetButton patcherState={patcherState} />
        </DivSubmit>
        <DivSubmit>
          <UpdatePresetButton patcherState={patcherState} />
        </DivSubmit>
      </DivTools>
    </DivContainer>
  );
};

Patcher.propTypes = { pedals: PropTypes.array, presets: PropTypes.array };

const mapStateToProps = state => {
  return {
    patcherState: state.patcherState
  };
};

const mapDispatchToProps = { addKnob, selectPreset, setScale, setPatchDetails };

export default connect(mapStateToProps, mapDispatchToProps)(Patcher);
