import React from "react";
import { PropTypes } from "prop-types";
import AvailablePedals from "../../Forms/Shared/AvailablePedals";
import { AvailablePresets } from "../../Forms/Patcher/AvailablePresets";
import { ComponentInfo } from "../../Forms/Shared/ComponentInfo";
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
    localState,
    addKnob,
    selectPreset,
    setScale,
    setPatchDetails
  } = props;
  const { width, height, color } = localState.pedalDetails;
  const {
    knobs,
    scale,
    tapKnobsIn,
    patchDetails,
    selectedComponentId,
    selectedComponentPosition
  } = localState;

  const pedalPresets = presets.filter(preset => {
    return preset.pedal.id === localState.pedalDetails.id;
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
            patchDetails={patchDetails}
            setPatchDetails={setPatchDetails}
            knobs={knobs}
            selectedComponentId={selectedComponentId}
          />
        </DivNotes>
        <DivDetails>
          <ComponentInfo
            knobs={knobs}
            selectedComponentId={selectedComponentId}
            selectedComponentPosition={selectedComponentPosition}
            pedalDetails={localState.pedalDetails}
          />
        </DivDetails>
        <DivSubmit>
          <CreatePresetButton localState={localState} />
        </DivSubmit>
        <DivSubmit>
          <UpdatePresetButton localState={localState} />
        </DivSubmit>
      </DivTools>
    </DivContainer>
  );
};

Patcher.propTypes = { pedals: PropTypes.array, presets: PropTypes.array };

const mapStateToProps = state => {
  return {
    localState: state.localState
  };
};

const mapDispatchToProps = { addKnob, selectPreset, setScale, setPatchDetails };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Patcher);
