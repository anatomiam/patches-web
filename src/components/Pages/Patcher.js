import React from "react";
import { AvailablePedals } from "../Forms/AvailablePedals";
import { ComponentInfo } from "../ComponentInfo";
import { Pedal } from "../Parts/Pedal";
import "../../index.css";
import { useStateValue } from "../../state/StateProvider";
import { Form, TextArea } from "semantic-ui-react";
import {
  DivContainer,
  DivDetails,
  DivNotes,
  DivPedal,
  DivPedalSelector
} from "../PageStyles";

const Patcher = ({ pedals }) => {
  const [{ localState }, dispatch] = useStateValue();
  const { width, height, name } = localState.pedalDetails;
  const { knobs } = localState;
  const { selectedComponentId, selectedComponentAngle } = localState;

  return (
    <DivContainer>
      <DivPedal>
        <Pedal
          knobs={knobs}
          width={width}
          height={height}
          name={name}
          dispatch={dispatch}
        />
      </DivPedal>
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
    </DivContainer>
  );
};

export default Patcher;
