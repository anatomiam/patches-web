import {
  SELECT_PEDAL,
  SELECT_PRESET,
  SET_SELECTED_COMPONENT_ID,
  SET_SELECTED_COMPONENT_POSITION,
  SET_PATCH_DETAILS,
  SET_SCALE,
  SET_IS_LOGGED_IN
} from "../Actions/Actions";
import { patcherData } from "../Data";
import { flattenKnobNotes, flattenKnobObjects } from "../../helpers/Helpers";

function patcherState(state = patcherData, action) {
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

    case SELECT_PRESET:
      const updatedPositions = state.knobs.map(knob => {
        const foundKnob = action.preset.patches.find(patch => {
          return knob.id === patch.knob.id;
        });
        return foundKnob
          ? { ...knob, position: foundKnob.position, patchId: foundKnob.id }
          : knob;
      });
      const patchNotes = {
        id: action.preset.id,
        name: action.preset.name,
        description: action.preset.description
      };
      // handle reforming patchDetails for form here?
      const knobNotes = flattenKnobNotes(action.preset.patches);
      return {
        ...state,
        patchDetails: { patchNotes, knobNotes },
        knobs: updatedPositions,
        originalKnobs: updatedPositions,
        patches: action.preset.patches
      };

    case SET_SELECTED_COMPONENT_ID:
      return {
        ...state,
        selectedComponentId: action.id
      };

    case SET_SELECTED_COMPONENT_POSITION:
      // TODO only update single knob instead of whole set?
      const updatedKnobs = state.knobs.map(knob => {
        if (knob.id !== action.knobId) {
          return knob;
        }
        return { ...knob, position: action.position };
      });
      return {
        ...state,
        knobs: updatedKnobs
      };
    case SET_PATCH_DETAILS:
      return {
        ...state,
        patchDetails: action.patchDetails
      };
    case SET_SCALE:
      return {
        ...state,
        scale: action.scale
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

export default patcherState;
