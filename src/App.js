import React, { createContext, useContext, useReducer } from "react";
import { AddKnobForm } from './components/AddKnobForm'
import { ComponentInfo } from './components/ComponentInfo'
import { Pedal } from './components/Pedal'
import { PedalForm } from './components/PedalForm'
import "./App.css";
import { pedal } from "./data";

const StateContext = createContext();

const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);

const App = () => {
  const initialState = { pedal: pedal };

  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_DIMENSIONS":
        return {
          ...state,
          pedal: {
            ...state.pedal,
            dimensions: action.dimensions
          }
        };
      case "SET_SELECTED_COMPONENT":
        return {
          ...state,
          pedal: {
            ...state.pedal,
            selectedComponent: action.selectedComponent
          }
        };
      case "ADD_KNOB":
        return {
          ...state,
          pedal: {
            ...state.pedal,
            components: {
              ...state.pedal.components,
              knobs: [...state.pedal.components.knobs, action.knob]
            }
          }
        };

      default:
        return state;
    }
  };

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
