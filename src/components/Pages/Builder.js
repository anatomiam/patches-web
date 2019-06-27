import React from "react";
import { AddKnobForm } from "../Forms/AddKnobForm";
import { AddSwitchForm } from "../Forms/AddSwitchForm";
import { AvailablePedals } from "../Forms/AvailablePedals";
import { ComponentInfo } from "../ComponentInfo";
import { Pedal } from "../Parts/Pedal";
import { PedalForm } from "../Forms/PedalForm";
import "../../index.css";
import { useStateValue } from "../../StateProvider";
import { CreatePedalButton } from "../Forms/CreatePedalButton";
import { Container, Segment } from "semantic-ui-react";

const Builder = ({ pedals }) => {
  // const { knobs, width, height, name } = pedal;
  const [{ localState }, dispatch] = useStateValue();
  const { width, height, name } = localState.pedalDetails;
  const { knobs } = localState;
  const { selectedComponentId, selectedComponentAngle } = localState;

  return (
    <>
      <Container>
        <Segment color="red">
          <PedalForm
            width={width}
            height={height}
            name={name}
            dispatch={dispatch}
          />
        </Segment>
        <Segment color="blue">
          <AddKnobForm dispatch={dispatch} />
        </Segment>
        <Segment color="teal">
          <AddSwitchForm dispatch={dispatch} />
        </Segment>
        <Segment color="olive">
          <CreatePedalButton localState={localState} />
        </Segment>
        <Segment color="black">
          <ComponentInfo
            knobs={knobs}
            dispatch={dispatch}
            selectedComponentId={selectedComponentId}
            selectedComponentAngle={selectedComponentAngle}
          />
        </Segment>
        <Segment color="orange">
          <AvailablePedals pedals={pedals} dispatch={dispatch} />
        </Segment>
      </Container>
      <Pedal
        knobs={knobs}
        width={width}
        height={height}
        name={name}
        dispatch={dispatch}
      />
    </>
  );
};

export default Builder;
