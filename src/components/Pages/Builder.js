import React, { useState } from "react";
import { AddKnobForm } from "../Forms/AddKnobForm";
import { AddSwitchForm } from "../Forms/AddSwitchForm";
import { AvailablePedals } from "../Forms/AvailablePedals";
import { ComponentInfo } from "../ComponentInfo";
import { Pedal } from "../Parts/Pedal";
import { PedalForm } from "../Forms/PedalForm";
import { useStateValue } from "../../state/StateProvider";
import { CreatePedalButton } from "../Forms/CreatePedalButton";
import { Accordion, Icon } from "semantic-ui-react";
import {
  DivContainer,
  DivDetails,
  DivForm,
  DivPedal,
  DivPedalDetails,
  DivPedalSelector,
  DivSubmit
} from "../PageStyles";

const Builder = ({ pedals }) => {
  const [{ localState }, dispatch] = useStateValue();
  const { width, height, name, color } = localState.pedalDetails;
  const { knobs } = localState;
  const { selectedComponentId, selectedComponentAngle } = localState;
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  };

  return (
    <DivContainer>
      <DivForm>
        <h2>{name}</h2>
        <Accordion styled>
          <Accordion.Title
            active={activeIndex === 0}
            index={0}
            onClick={handleClick}
          >
            <Icon name="plus square outline" />
            Set the Pedal dimensions
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 0}>
            <PedalForm
              width={width}
              height={height}
              name={name}
              dispatch={dispatch}
            />
          </Accordion.Content>

          <Accordion.Title
            active={activeIndex === 1}
            index={1}
            onClick={handleClick}
          >
            <Icon name="circle notch" />
            Add a Knob
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 1}>
            <AddKnobForm dispatch={dispatch} />
          </Accordion.Content>

          <Accordion.Title
            active={activeIndex === 2}
            index={2}
            onClick={handleClick}
          >
            <Icon name="toggle on" />
            Add a Switch
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 2}>
            <AddSwitchForm dispatch={dispatch} />
          </Accordion.Content>
        </Accordion>
      </DivForm>
      <DivPedal>
        <Pedal
          knobs={knobs}
          width={width}
          height={height}
          color={color}
          dispatch={dispatch}
        />
      </DivPedal>
      <DivPedalSelector>
        <AvailablePedals pedals={pedals} dispatch={dispatch} />
      </DivPedalSelector>
      <DivPedalDetails>
        <div>pedal width</div>
        <div>pedal height</div>
        <div>name or somthing</div>
      </DivPedalDetails>
      <DivDetails>
        <ComponentInfo
          knobs={knobs}
          dispatch={dispatch}
          selectedComponentId={selectedComponentId}
          selectedComponentAngle={selectedComponentAngle}
        />
      </DivDetails>
      <DivSubmit>
        <CreatePedalButton localState={localState} />
      </DivSubmit>
    </DivContainer>
  );
};

export default Builder;
