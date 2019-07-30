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
import { Grid, Segment } from "semantic-ui-react";

const Builder = ({ pedals }) => {
  // const { knobs, width, height, name } = pedal;
  const [{ localState }, dispatch] = useStateValue();
  const { width, height, name } = localState.pedalDetails;
  const { knobs } = localState;
  const { selectedComponentId, selectedComponentAngle } = localState;

  return (
    <>
      <Grid>
        <Grid.Row centered columns={3}>
          <Grid.Column>
            <Segment color="red">
              <PedalForm
                width={width}
                height={height}
                name={name}
                dispatch={dispatch}
              />
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment color="orange">
              <AvailablePedals pedals={pedals} dispatch={dispatch} />
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment color="blue">
              <AddKnobForm dispatch={dispatch} />
            </Segment>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={4}>
            <Segment color="teal">
              <AddSwitchForm dispatch={dispatch} />
            </Segment>
          </Grid.Column>
          <Grid.Column width={8} style={{ textAlign: "center" }}>
            <Pedal
              knobs={knobs}
              width={width}
              height={height}
              name={name}
              dispatch={dispatch}
            />
          </Grid.Column>
          <Grid.Column width={4}>
            <Segment color="black">
              <ComponentInfo
                knobs={knobs}
                dispatch={dispatch}
                selectedComponentId={selectedComponentId}
                selectedComponentAngle={selectedComponentAngle}
              />
            </Segment>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row centered>
          <Grid.Column>
            <Segment color="olive">
              <CreatePedalButton localState={localState} />
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
};

export default Builder;
