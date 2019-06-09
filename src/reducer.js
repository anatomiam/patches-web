import { pedal, localState } from "./data";

export const initialState = { pedal, localState };
export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_SELECTED_COMPONENT_ID":
      return {
        ...state,
        localState: {
          ...state.localState,
          selectedComponentId: action.id
        }
      };
    case "SET_SELECTED_COMPONENT_ANGLE":
      return {
        ...state,
        localState: {
          ...state.localState,
          selectedComponentAngle: action.angle
        }
      };
    case "UPDATE_KNOB_ANGLE":
      // TODO loop through knobs to create or update 
      // select by id 
      // if doesnt exist, create
      // if exists, update
      const knobsCopy = state.localState.updatedKnobAngles.slice();
      const updatedKnobs = knobsCopy.map(knob => {
        if (knob.id !== action.knobId) {
          return knob;
        }
        return { ...knob, angle: action.angle };
      });

      return {
        ...state,
        localState: {
          ...state.localState,
          updatedKnobAngles: updatedKnobs
        }
      };
    default:
      return state;
  }
};
