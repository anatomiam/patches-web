import React from "react";
import { AddKnobForm } from "./components/AddKnobForm";
import { AddSwitchForm } from "./components/AddSwitchForm";
import { ComponentInfo } from "./components/ComponentInfo";
import { Pedal } from "./components/Pedal";
import { PedalForm } from "./components/PedalForm";
import KnobqlList from "./components/KnobqlList";
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
          <AddSwitchForm />
        </div>
        <div className="display-stuff">
          <ComponentInfo />
        </div>
      </div>
      <Pedal />
      <KnobqlList />
    </StateProvider>
  );
};

export default App;
