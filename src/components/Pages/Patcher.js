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

const Patcher = ({ pedals }) => {
  // const { knobs, width, height, name } = pedal;
  const [{ localState }, dispatch] = useStateValue();
  const { width, height, name } = localState.pedalDetails;
  const { knobs } = localState;
  const { selectedComponentId, selectedComponentAngle } = localState;

  const selectedPedalDetails = localState.pedalDetails
    ? pedals.find(pedal => {
        return pedal.id === localState.pedalDetails.id;
      })
    : null;

  return (
    <>
      <div className="info">
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

export default Patcher;
