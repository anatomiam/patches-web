import { pedal, localState } from "./data";

export const initialState = { pedal, localState };
export const reducer = (state, action) => {
  switch (action.type) {
    case "SELECT_PEDAL":
      return {
        ...state,
        localState: {
          ...state.localState,
          pedalDetails: {
            id: action.pedal.id,
            name: action.pedal.name,
            width: action.pedal.width,
            height: action.pedal.height
          },
          knobs: action.pedal.knobs
        }
      };
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
    case "SET_PEDAL_DETAILS":
      return {
        ...state,
        localState: {
          ...state.localState,
          pedalDetails: action.pedalDetails
        }
      };
    case "ADD_KNOB":
      return {
        ...state,
        localState: {
          ...state.localState,
          knobs: [...state.localState.knobs, action.knob]
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