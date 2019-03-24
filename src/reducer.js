import { pedal } from "./data";

export const initialState = { pedal: pedal };
export const reducer = (state, action) => {
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
    case "UPDATE_KNOB_ANGLE":
      const knobsCopy = state.pedal.components.knobs.slice();
      const updatedKnobs = knobsCopy.map(knob => {
        if (knob.uuid !== action.uuid) {
          return knob;
        }
        return { ...knob, angle: action.angle };
      });

      return {
        ...state,
        pedal: {
          ...state.pedal,
          components: {
            ...state.pedal.components,
            knobs: updatedKnobs
          }
        }
      };

    default:
      return state;
  }
};
