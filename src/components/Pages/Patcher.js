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
  DivPedalSelector,
  DivTools
} from "../PageStyles";

const Patcher = ({ pedals }) => {
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
      </DivTools>
    </DivContainer>
  );
};

export default Patcher;
