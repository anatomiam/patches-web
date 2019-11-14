import {
  SELECT_PEDAL,
  SELECT_PRESET,
  SET_SELECTED_COMPONENT_ID,
  SET_SELECTED_COMPONENT_POSITION,
  SET_PEDAL_DETAILS,
  SET_PATCH_DETAILS,
  DRAG_KNOB,
  TAP_KNOB,
  SET_SCALE,
  ADD_KNOB,
  DELETE_KNOB,
  UPDATE_CX,
  UPDATE_CY,
  START_FROM_SCRATCH,
  SET_IS_LOGGED_IN
} from "../Actions/Actions";
import { builderData } from "../Data";
import { flattenKnobNotes, flattenKnobObjects } from "../../helpers/Helpers";

function builderState(state = builderData, action) {
  switch (action.type) {
    case SELECT_PEDAL:
      console.log(action);
      const initialKnobNotes = flattenKnobObjects(action.knobs);
      return {
        ...state,
        pedalDetails: {
          id: action.id,
          name: action.name,
          width: action.width,
          height: action.height,
          color: action.color
        },
        knobs: action.knobs,
        originalKnobs: action.knobs,
        patchDetails: {
          patchNotes: state.patchDetails.patchNotes,
          knobNotes: initialKnobNotes
        },
        isNewPedal: false
      };

    // case SELECT_PRESET:
    //   const updatedPositions = state.knobs.map(knob => {
    //     const foundKnob = action.preset.patches.find(patch => {
    //       return knob.id === patch.knob.id;
    //     });
    //     return foundKnob
    //       ? { ...knob, position: foundKnob.position, patchId: foundKnob.id }
    //       : knob;
    //   });
    //   const patchNotes = {
    //     id: action.preset.id,
    //     name: action.preset.name,
    //     description: action.preset.description
    //   };
    //   // handle reforming patchDetails for form here?
    //   const knobNotes = flattenKnobNotes(action.preset.patches);
    //   return {
    //     ...state,
    //     patchDetails: { patchNotes, knobNotes },
    //     knobs: updatedPositions,
    //     originalKnobs: updatedPositions,
    //     patches: action.preset.patches
    //   };

    case SET_SELECTED_COMPONENT_ID:
      return {
        ...state,
        selectedComponentId: action.id
      };

    // case SET_SELECTED_COMPONENT_POSITION:
    //   // TODO only update single knob instead of whole set?
    //   const updatedKnobs = state.knobs.map(knob => {
    //     if (knob.id !== action.knobId) {
    //       return knob;
    //     }
    //     return { ...knob, position: action.position };
    //   });
    //   return {
    //     ...state,
    //     knobs: updatedKnobs
    //   };
    case SET_PEDAL_DETAILS:
      return {
        ...state,
        pedalDetails: action.pedalDetails
      };
    // case SET_PATCH_DETAILS:
    //   return {
    //     ...state,
    //     patchDetails: action.patchDetails
    //   };
    case DRAG_KNOB:
      return {
        ...state,
        drag: !state.drag
      };
    case TAP_KNOB:
      return {
        ...state,
        tapKnobsIn: !state.tapKnobsIn
      };
    case SET_SCALE:
      return {
        ...state,
        scale: action.scale
      };
    case ADD_KNOB:
      return {
        ...state,
        knobs: [...state.knobs, action.knob]
      };
    case DELETE_KNOB:
      const knobsUpdatedDeleted = state.knobs.filter(knob => {
        return knob.id !== action.selectedComponentId;
      });
      return {
        ...state,
        knobs: knobsUpdatedDeleted
      };
    case UPDATE_CX:
      const knobsUpdatedCx = state.knobs.map(knob => {
        return knob.id !== action.selectedComponentId
          ? knob
          : { ...knob, cx: action.cx };
      });
      return {
        ...state,
        knobs: knobsUpdatedCx
      };
    case UPDATE_CY:
      const knobsUpdatedCy = state.knobs.map(knob => {
        return knob.id !== action.selectedComponentId
          ? knob
          : { ...knob, cy: action.cy };
      });
      return {
        ...state,
        knobs: knobsUpdatedCy
      };
    case START_FROM_SCRATCH:
      return {
        ...state,
        isNewPedal: true,
        isLoggedIn: true,
        selectedComponentId: null,
        selectedComponentPosition: 0,
        drag: false,
        scale: 1,
        knobs: [],
        originalKnobs: [],
        patchDetails: {
          patchNotes: {
            name: "",
            description: "",
            id: ""
          },
          knobNotes: {}
        },
        pedalDetails: {
          name: "",
          height: 0,
          width: 0,
          color: "#d4d7dd"
        }
      };
    case SET_IS_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: action.isLoggedIn
      };

    default:
      return state;
  }
}

export default builderState;
