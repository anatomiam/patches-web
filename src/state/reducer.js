import { localState } from "./data";

export const initialState = { localState };
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
            height: action.pedal.height,
            color: action.pedal.color
          },
          knobs: action.pedal.knobs,
          originalKnobs: action.pedal.knobs,
          isNewPedal: false
        }
      };
    case "SELECT_PRESET":
      // TODO refactor this
      const updatedAngles = state.localState.knobs.map(knob => {
        const foundKnob = action.preset.patches.find(patch => {
          return knob.id === patch.knob.id;
        });
        return foundKnob ? { ...knob, angle: foundKnob.angle } : knob;
      });

      return {
        ...state,
        localState: {
          ...state.localState,
          patchDetails: {
            name: action.preset.name,
            description: action.preset.description
          },
          knobs: updatedAngles
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
      // TODO only update single knob instead of whole set?
      const updatedKnobs = state.localState.knobs.map(knob => {
        if (knob.id !== action.knobId) {
          return knob;
        }
        return { ...knob, angle: action.angle };
      });
      return {
        ...state,
        localState: {
          ...state.localState,
          knobs: updatedKnobs
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
    case "SET_PATCH_DETAILS":
      return {
        ...state,
        localState: {
          ...state.localState,
          patchDetails: action.patchDetails
        }
      };
    case "DRAG_KNOB":
      return {
        ...state,
        localState: {
          ...state.localState,
          drag: !state.localState.drag
        }
      };
    case "TAP_KNOB":
      return {
        ...state,
        localState: {
          ...state.localState,
          tapKnobsIn: !state.localState.tapKnobsIn
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
    case "DELETE_KNOB":
      const knobsUpdatedDeleted = state.localState.knobs.filter(knob => {
        return knob.id !== action.selectedComponentId;
      });
      return {
        ...state,
        localState: {
          ...state.localState,
          knobs: knobsUpdatedDeleted
        }
      };
    case "UPDATE_CX":
      const knobsUpdatedCx = state.localState.knobs.map(knob => {
        return knob.id !== action.selectedComponentId
          ? knob
          : { ...knob, cx: action.cx };
      });
      return {
        ...state,
        localState: {
          ...state.localState,
          knobs: knobsUpdatedCx
        }
      };
    case "UPDATE_CY":
      const knobsUpdatedCy = state.localState.knobs.map(knob => {
        return knob.id !== action.selectedComponentId
          ? knob
          : { ...knob, cy: action.cy };
      });
      return {
        ...state,
        localState: {
          ...state.localState,
          knobs: knobsUpdatedCy
        }
      };
    case "START_FROM_SCRATCH":
      return {
        ...state,
        localState: {
          ...state.localState,
          isNewPedal: true,
          selectedComponentId: null,
          selectedComponentAngle: 0,
          drag: false,
          updatedKnobAngles: [],
          knobs: [],
          originalKnobs: [],
          patchDetails: {
            name: "",
            description: ""
          },
          pedalDetails: {
            name: "",
            height: 0,
            width: 0,
            color: "#d4d7dd"
          }
        }
      };

    default:
      return state;
  }
};
