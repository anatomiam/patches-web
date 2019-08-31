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
import { Segment } from "semantic-ui-react";

const Builder = ({ pedals }) => {
  // const { knobs, width, height, name } = pedal;
  const [{ localState }, dispatch] = useStateValue();
  const { width, height, name } = localState.pedalDetails;
  const { knobs } = localState;
  const { selectedComponentId, selectedComponentAngle } = localState;

  return (
    <>
      <div className="builder-container">
        <div className="builder-form">
          <Segment color="red">
            <h2>{name}</h2>
            <PedalForm
              width={width}
              height={height}
              name={name}
              dispatch={dispatch}
            />
          </Segment>
        </div>
        {/* <Segment color="blue">
          <AddKnobForm dispatch={dispatch} />
        </Segment>
        <Segment color="teal">
          <AddSwitchForm dispatch={dispatch} />
        </Segment> */}
        <div className="builder-pedal">
          <Pedal
            knobs={knobs}
            width={width}
            height={height}
            name={name}
            dispatch={dispatch}
          />
        </div>
        <div className="builder-pedal-selector">
          <Segment color="orange">
            <AvailablePedals pedals={pedals} dispatch={dispatch} />
          </Segment>
        </div>
        <div className="builder-pedal-details">
          <Segment color="black">
            <div>pedal width</div>
            <div>pedal height</div>
            <div>name or somthing</div>
          </Segment>
        </div>
        <div className="builder-details">
          <Segment color="black">
            <ComponentInfo
              knobs={knobs}
              dispatch={dispatch}
              selectedComponentId={selectedComponentId}
              selectedComponentAngle={selectedComponentAngle}
            />
          </Segment>
        </div>
        <div className="builder-submit">
          <Segment color="olive">
            <CreatePedalButton localState={localState} />
          </Segment>
        </div>
      </div>
    </>
  );
};

export default Builder;
