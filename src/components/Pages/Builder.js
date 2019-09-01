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

const styles = {
  builderContainer: {
    display: "grid",
    gridTemplateRows: "100px 100px repeat(5, minmax(75px, 125px)) 75px 75px",
    gridTemplateColumns: "repeat(9, 1fr)",
    gridGap: "1px"
  },
  builderPedal: {
    gridColumn: "3 / 8",
    gridRow: "2 / 8",
    placeSelf: "start center"
  },
  builderForm: {
    gridColumn: "1 / 3",
    gridRow: "1 / 8"
  },
  builderDetails: {
    gridColumn: "8 / 10",
    gridRow: "3 / 7"
  },
  builderPedalDetails: {
    gridColumn: "8 / 10",
    gridRow: "2 / 3"
  },
  builderPedalSelector: {
    gridColumn: "8 / 10",
    gridRow: "1 / 2",
    placeSelf: "center"
  },
  builderSubmit: {
    gridColumn: "8 / 10",
    gridRow: "7 / 8",
    placeSelf: "center end"
  }
};

const Builder = ({ pedals }) => {
  const [{ localState }, dispatch] = useStateValue();
  const { width, height, name } = localState.pedalDetails;
  const { knobs } = localState;
  const { selectedComponentId, selectedComponentAngle } = localState;
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  };

  return (
    <>
      <div style={styles.builderContainer}>
        <div style={styles.builderForm}>
          <h2>{name}</h2>
          <Accordion styled>
            <Accordion.Title
              active={activeIndex === 0}
              index={0}
              onClick={handleClick}
            >
              <Icon name="asterisk" />
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
        </div>
        <div style={styles.builderPedal}>
          <Pedal
            knobs={knobs}
            width={width}
            height={height}
            name={name}
            dispatch={dispatch}
          />
        </div>
        <div style={styles.builderPedalSelector}>
          <AvailablePedals pedals={pedals} dispatch={dispatch} />
        </div>
        <div style={styles.builderPedalDetails}>
          <div>pedal width</div>
          <div>pedal height</div>
          <div>name or somthing</div>
        </div>
        <div style={styles.builderDetails}>
          <ComponentInfo
            knobs={knobs}
            dispatch={dispatch}
            selectedComponentId={selectedComponentId}
            selectedComponentAngle={selectedComponentAngle}
          />
        </div>
        <div style={styles.builderSubmit}>
          <CreatePedalButton localState={localState} />
        </div>
      </div>
    </>
  );
};

export default Builder;
