import React from "react";
import { AvailablePedals } from "../Forms/AvailablePedals";
import { AvailablePresets } from "../Forms/AvailablePresets";
import { ComponentInfo } from "../Forms/ComponentInfo";
import { PatchForm } from "../Forms/PatchForm";
import { Pedal } from "../Parts/Pedal";
import "../../index.css";
import { useStateValue } from "../../state/StateProvider";
import { CreatePresetButton } from "../Forms/CreatePresetButton";
import {
  DivContainer,
  DivDetails,
  DivNotes,
  DivPedal,
  DivSubmit,
  DivPedalSelector,
  DivTools
} from "./PageStyles";

const Patcher = ({ pedals, presets }) => {
  const [{ localState }, dispatch] = useStateValue();
  const { width, height, color } = localState.pedalDetails;
  const { knobs, selectedComponentId, selectedComponentAngle } = localState;
  const { name, description } = localState.patchDetails;
  const pedalPresets = presets.filter(preset => {
    return preset.pedal.id === localState.pedalDetails.id;
  });

  return (
    <DivContainer>
      <DivPedal>
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
        <DivNotes>
          <PatchForm
            name={name}
            description={description}
            dispatch={dispatch}
          />
        </DivNotes>
        <DivDetails>
          <ComponentInfo
            knobs={knobs}
            dispatch={dispatch}
            selectedComponentId={selectedComponentId}
            selectedComponentAngle={selectedComponentAngle}
          />
        </DivDetails>
        <DivSubmit>
          <CreatePresetButton localState={localState} />
        </DivSubmit>
      </DivTools>
    </DivContainer>
  );
};

export default Patcher;
