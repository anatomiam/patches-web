import { pedal, localState } from "./data";

export const initialState = { pedal, localState };
export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_SELECTED_COMPONENT":
      return {
        ...state,
        localState: {
          ...state.localState,
          selectedComponent: action.selectedComponent
        }
      };
    case "ADD_KNOB_ANGLE":
      return {
        ...state,
        localState: {
          ...state.localState,
          updatedKnobAngles: action.knobAngles
        }
      };
    case "UPDATE_KNOB_ANGLE":
      console.log(state);
      console.log(action);

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
    case "SET_DIMENSIONS":
      return {
        ...state,
        pedal: {
          ...state.pedal,
          dimensions: action.dimensions
        }
      };
    case "SET_SELECTED_COMPONENT_OLD":
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
    case "ADD_SWITCH":
      return {
        ...state,
        pedal: {
          ...state.pedal,
          components: {
            ...state.pedal.components,
            knobs: [...state.pedal.components.knobs, action.switch]
          }
        }
      };
    // case "UPDATE_KNOB_ANGLE":
    //   const knobsCopy = state.pedal.components.knobs.slice();
    //   const updatedKnobs = knobsCopy.map(knob => {
    //     if (knob.uuid !== action.uuid) {
    //       return knob;
    //     }
    //     return { ...knob, angle: action.angle };
    //   });

    //   return {
    //     ...state,
    //     pedal: {
    //       ...state.pedal,
    //       components: {
    //         ...state.pedal.components,
    //         knobs: updatedKnobs
    //       }
    //     }
    //   };

    default:
      return state;
  }
};
