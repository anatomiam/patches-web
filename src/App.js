import React from "react";
import { AddKnobForm } from "./components/Forms/AddKnobForm";
import { AddSwitchForm } from "./components/Forms/AddSwitchForm";
import { ComponentInfo } from "./components/ComponentInfo";
import { Pedal } from "./components/Parts/Pedal";
import { PedalForm } from "./components/Forms/PedalForm";
import { reducer, initialState } from "./reducer.js";
import { StateProvider } from "./StateProvider";
import "./index.css";

const App = () => {
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <div className="info">
        <div className="form-stuff">
          <PedalForm />
          <AddKnobForm />
          <AddSwitchForm />
        </div>
        <div className="display-stuff">
          <ComponentInfo />
        </div>
      </div>
      <Pedal />
    </StateProvider>
  );
};

export default App;
