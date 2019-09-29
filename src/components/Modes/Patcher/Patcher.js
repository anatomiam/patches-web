import React from "react";
import { PropTypes } from "prop-types";
import { AvailablePedals } from "../../Forms/Shared/AvailablePedals";
import { AvailablePresets } from "../../Forms/Patcher/AvailablePresets";
import { ComponentInfo } from "../../Forms/Shared/ComponentInfo";
import { PatchForm } from "../../Forms/Patcher/PatchForm";
import { Pedal } from "../../DeviceComponents/Body/Pedal";
import "../../../index.css";
import { useStateValue } from "../../../state/StateProvider";
import { CreatePresetButton } from "../../Forms/Patcher/CreatePresetButton";
import { Scaler } from "../General/Scaler";
import {
  DivContainer,
  DivDetails,
  DivNotes,
  DivPedal,
  DivSubmit,
  DivPedalSelector,
  DivTools
} from "../PageStyles";

const Patcher = ({ pedals, presets }) => {
  const [{ localState }, dispatch] = useStateValue();
  const { width, height, color } = localState.pedalDetails;
  const {
    knobs,
    scale,
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
          dispatch={dispatch}
          patcher
        />
      </DivPedal>
      <DivTools>
        <DivPedalSelector>
          <AvailablePedals pedals={pedals} dispatch={dispatch} />
          <AvailablePresets presets={pedalPresets} dispatch={dispatch} />
        </DivPedalSelector>
        <Scaler scale={scale} dispatch={dispatch} />
        <DivNotes>
          <PatchForm
            patchDetails={patchDetails}
            dispatch={dispatch}
            knobs={knobs}
            selectedComponentId={selectedComponentId}
          />
        </DivNotes>
        <DivDetails>
          <ComponentInfo
            knobs={knobs}
            dispatch={dispatch}
            selectedComponentId={selectedComponentId}
            selectedComponentPosition={selectedComponentPosition}
          />
        </DivDetails>
        <DivSubmit>
          <CreatePresetButton localState={localState} />
        </DivSubmit>
      </DivTools>
    </DivContainer>
  );
};

Patcher.propTypes = { pedals: PropTypes.array, presets: PropTypes.array };

export default Patcher;
