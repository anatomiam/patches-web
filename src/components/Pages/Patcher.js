import React from "react";
import { AvailablePedals } from "../Forms/AvailablePedals";
import { ComponentInfo } from "../Forms/ComponentInfo";
import { Pedal } from "../Parts/Pedal";
import "../../index.css";
import { useStateValue } from "../../state/StateProvider";
import { Form, TextArea } from "semantic-ui-react";
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
  const { knobs } = localState;
  const { selectedComponentId, selectedComponentAngle } = localState;

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
        <DivNotes>
          <Form>
            <TextArea placeholder="Tell us more" />
          </Form>
        </DivNotes>
        <DivDetails>
          <ComponentInfo
            knobs={knobs}
            dispatch={dispatch}
            selectedComponentId={selectedComponentId}
            selectedComponentAngle={selectedComponentAngle}
          />
        </DivDetails>
        <DivPedalSelector>
          <AvailablePedals pedals={pedals} dispatch={dispatch} />
        </DivPedalSelector>
        <DivSubmit>
          <CreatePresetButton localState={localState} />
        </DivSubmit>
      </DivTools>
    </DivContainer>
  );
};

export default Patcher;
