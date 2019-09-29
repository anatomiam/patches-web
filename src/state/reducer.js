import { localState } from "./Data";
import { flattenKnobNotes, flattenKnobObjects } from "../helpers/Helpers";

export const initialState = { localState };
export const reducer = (state, action) => {
  switch (action.type) {
    case "SELECT_PEDAL":
      const initialKnobNotes = flattenKnobObjects(action.pedal.knobs);
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
          patchDetails: {
            patchNotes: localState.patchDetails.patchNotes,
            knobNotes: initialKnobNotes
          },
          isNewPedal: false
        }
      };
    case "SELECT_PRESET":
      // TODO refactor this
      const updatedPositions = state.localState.knobs.map(knob => {
        const foundKnob = action.preset.patches.find(patch => {
          return knob.id === patch.knob.id;
        });
        return foundKnob ? { ...knob, position: foundKnob.position } : knob;
      });

      const patchNotes = {
        name: action.preset.name,
        description: action.preset.description
      };
      // handle reforming patchDetails for form here?
      const knobNotes = flattenKnobNotes(action.preset.patches);

      return {
        ...state,
        localState: {
          ...state.localState,
          patchDetails: { patchNotes, knobNotes },
          knobs: updatedPositions
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
    case "SET_SELECTED_COMPONENT_POSITION":
      // TODO only update single knob instead of whole set?
      const updatedKnobs = state.localState.knobs.map(knob => {
        if (knob.id !== action.knobId) {
          return knob;
        }
        return { ...knob, position: action.position };
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
    case "SET_SCALE":
      return {
        ...state,
        localState: {
          ...state.localState,
          scale: action.scale
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
          selectedComponentPosition: 0,
          drag: false,
          scale: 1,
          updatedKnobPositions: [],
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
