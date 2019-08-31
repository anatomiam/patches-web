import React from "react";
import { AvailablePedals } from "../Forms/AvailablePedals";
import { ComponentInfo } from "../ComponentInfo";
import { Pedal } from "../Parts/Pedal";
import "../../index.css";
import { useStateValue } from "../../StateProvider";
import { Form, TextArea } from "semantic-ui-react";

const styles = {
  patcherContainer: {
    display: "grid",
    gridTemplateRows: "100px 100px repeat(5, minmax(75px, 125px)) 75px 75px",
    gridTemplateColumns: "repeat(9, 1fr)",
    gridGap: "1px"
  },
  patcherPedal: {
    gridColumn: "3 / 8",
    gridRow: "2 / 8",
    placeSelf: "start center"
  },
  patcherDetails: {
    gridColumn: "8 / 10",
    gridRow: "3 / 7"
  },
  patcherPedalSelector: {
    gridColumn: "8 / 10",
    gridRow: "1 / 2",
    placeSelf: "center"
  },
  patcherNotes: {
    gridColumn: "1 / 3",
    gridRow: "1 / 8"
  }
};
const Patcher = ({ pedals }) => {
  // const { knobs, width, height, name } = pedal;
  const [{ localState }, dispatch] = useStateValue();
  const { width, height, name } = localState.pedalDetails;
  const { knobs } = localState;
  const { selectedComponentId, selectedComponentAngle } = localState;

  return (
    <>
      <div style={styles.patcherContainer}>
        <div style={styles.patcherPedal}>
          <Pedal
            knobs={knobs}
            width={width}
            height={height}
            name={name}
            dispatch={dispatch}
          />
        </div>
        <div style={styles.patcherNotes}>
          <Form>
            <TextArea placeholder="Tell us more" />
          </Form>
        </div>
        <div style={styles.patcherDetails}>
          <ComponentInfo
            knobs={knobs}
            dispatch={dispatch}
            selectedComponentId={selectedComponentId}
            selectedComponentAngle={selectedComponentAngle}
          />
        </div>
        <div style={styles.patcherPedalSelector}>
          <AvailablePedals pedals={pedals} dispatch={dispatch} />
        </div>
      </div>
    </>
  );
};

export default Patcher;
