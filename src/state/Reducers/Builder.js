import {
  SELECT_PEDAL_BUILDER,
  SET_SELECTED_COMPONENT_ID,
  SET_PEDAL_DETAILS,
  DRAG_KNOB,
  TAP_KNOB,
  SET_SCALE_BUILDER,
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
    case SELECT_PEDAL_BUILDER:
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
    case SET_SELECTED_COMPONENT_ID:
      return {
        ...state,
        selectedComponentId: action.id
      };
    case SET_PEDAL_DETAILS:
      return {
        ...state,
        pedalDetails: action.pedalDetails
      };
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
    case SET_SCALE_BUILDER:
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
