import React from "react";
import { AddKnobForm } from "./components/AddKnobForm";
import { ComponentInfo } from "./components/ComponentInfo";
import { Pedal } from "./components/Pedal";
import { PedalForm } from "./components/PedalForm";
import { reducer, initialState } from "./reducer.js";
import { StateProvider } from "./StateProvider";
import "./App.css";

const App = () => {
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <div className="info">
        <div className="form-stuff">
          <PedalForm />
          <AddKnobForm />
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
