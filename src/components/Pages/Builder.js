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

const Builder = ({ pedals }) => {
  // const { knobs, width, height, name } = pedal;
  const [{ localState }, dispatch] = useStateValue();
  const { width, height, name } = localState.pedalDetails;
  const { knobs } = localState;
  const { selectedComponentId, selectedComponentAngle } = localState;
  return (
    <>
      <div className="info">
        <div className="form-stuff">
          <PedalForm
            width={width}
            height={height}
            name={name}
            dispatch={dispatch}
          />
          <AddKnobForm dispatch={dispatch} />
          <AddSwitchForm dispatch={dispatch} />
          <CreatePedalButton localState={localState} />
        </div>
        <div className="display-stuff">
          <ComponentInfo
            knobs={knobs}
            dispatch={dispatch}
            selectedComponentId={selectedComponentId}
            selectedComponentAngle={selectedComponentAngle}
          />
          <AvailablePedals pedals={pedals} dispatch={dispatch} />
        </div>
      </div>
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
