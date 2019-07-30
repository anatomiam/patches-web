import React from "react";
import { AvailablePedals } from "../Forms/AvailablePedals";
import { ComponentInfo } from "../ComponentInfo";
import { Pedal } from "../Parts/Pedal";
import "../../index.css";
import { useStateValue } from "../../StateProvider";
import { Form, Grid, TextArea } from "semantic-ui-react";

const Patcher = ({ pedals }) => {
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
            <Pedal
              knobs={knobs}
              width={width}
              height={height}
              name={name}
              dispatch={dispatch}
            />
          </Grid.Column>
          <Grid.Column>
            <Form>
              <TextArea placeholder="Tell us more" />
            </Form>
            <ComponentInfo
              knobs={knobs}
              dispatch={dispatch}
              selectedComponentId={selectedComponentId}
              selectedComponentAngle={selectedComponentAngle}
            />
          </Grid.Column>
          <Grid.Column>
            <AvailablePedals pedals={pedals} dispatch={dispatch} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
};

export default Patcher;
