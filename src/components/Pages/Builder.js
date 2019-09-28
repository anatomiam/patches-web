import React, { useState } from "react";
import { AddKnobForm } from "../Forms/AddKnobForm";
import { AddSwitchForm } from "../Forms/AddSwitchForm";
import { AvailablePedals } from "../Forms/AvailablePedals";
import { ComponentInfo } from "../Forms/ComponentInfo";
import { Pedal } from "../Parts/Pedal";
import { PedalForm } from "../Forms/PedalForm";
import { useStateValue } from "../../state/StateProvider";
import { CreatePedalButton } from "../Forms/CreatePedalButton";
import { DragKnobButton } from "../Forms/DragKnobButton";
import { UpdatePedalButton } from "../Forms/UpdatePedalButton";
import { StartFromScratchButton } from "../Forms/StartFromScratchButton";
import { Accordion, Icon } from "semantic-ui-react";
import {
  DivContainer,
  DivDetails,
  DivForm,
  DivPedal,
  DivPedalSelector,
  DivSubmit,
  DivTools
} from "./PageStyles";
import { TapKnobsInButton } from "../Forms/tapKnobsInButton";

const Builder = ({ pedals }) => {
  const [{ localState }, dispatch] = useStateValue();
  const { width, height, name, color, id } = localState.pedalDetails;
  const {
    knobs,
    isNewPedal,
    selectedComponentId,
    selectedComponentPosition,
    drag,
    tapKnobsIn
  } = localState;
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  };

  return (
    <DivContainer>
      <DivPedal>
        <Pedal
          knobs={knobs}
          width={width}
          height={height}
          color={color}
          dispatch={dispatch}
          drag={drag}
          tapKnobsIn={tapKnobsIn}
          builder
        />
      </DivPedal>
      <DivTools>
        <DivPedalSelector>
          <AvailablePedals pedals={pedals} dispatch={dispatch} />
        </DivPedalSelector>
        <DragKnobButton drag={drag} dispatch={dispatch} />
        <TapKnobsInButton tapKnobsIn={tapKnobsIn} dispatch={dispatch} />
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
                id={id}
                width={width}
                height={height}
                name={name}
                color={color}
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
        <DivDetails>
          <ComponentInfo
            knobs={knobs}
            dispatch={dispatch}
            selectedComponentId={selectedComponentId}
            selectedComponentPosition={selectedComponentPosition}
            pedalDetails={localState.pedalDetails}
          />
        </DivDetails>
        <DivSubmit>
          {isNewPedal ? (
            <CreatePedalButton localState={localState} />
          ) : (
            <UpdatePedalButton localState={localState} />
          )}
        </DivSubmit>
        <DivSubmit>
          <StartFromScratchButton dispatch={dispatch} />
        </DivSubmit>
      </DivTools>
    </DivContainer>
  );
};

export default Builder;
