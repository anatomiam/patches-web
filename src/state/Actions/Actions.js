export const SELECT_PEDAL = "SELECT_PEDAL";
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
export const SELECT_PEDAL_BUILDER = "SELECT_PEDAL_BUILDER";
export const SELECT_PRESET = "SELECT_PRESET";
export const SET_SELECTED_COMPONENT_ID = "SET_SELECTED_COMPONENT_ID";
export const SET_SELECTED_COMPONENT_POSITION =
  "SET_SELECTED_COMPONENT_POSITION";
export const SET_PEDAL_DETAILS = "SET_PEDAL_DETAILS";
export const SET_PATCH_DETAILS = "SET_PATCH_DETAILS";
export const DRAG_KNOB = "DRAG_KNOB";
export const TAP_KNOB = "TAP_KNOB";
export const SET_SCALE = "SET_SCALE";
export const SET_SCALE_BUILDER = "SET_SCALE_BUILDER";
export const ADD_KNOB = "ADD_KNOB";
export const DELETE_KNOB = "DELETE_KNOB";
export const UPDATE_CX = "UPDATE_CX";
export const UPDATE_CY = "UPDATE_CY";
export const START_FROM_SCRATCH = "START_FROM_SCRATCH";
export const SET_IS_LOGGED_IN = "SET_IS_LOGGED_IN";

export function selectPedal(
  id,
  name,
  width,
  height,
  color,
  knobs,
  patchDetails
) {
  return {
    type: SELECT_PEDAL,
    id,
    name,
    width,
    height,
    color,
    knobs,
    patchDetails
  };
}

export function selectPedalBuilder(
  id,
  name,
  width,
  height,
  color,
  knobs,
  patchDetails
) {
  return {
    type: SELECT_PEDAL_BUILDER,
    id,
    name,
    width,
    height,
    color,
    knobs,
    patchDetails
  };
}

export function selectPreset(preset) {
  return { type: SELECT_PRESET, preset };
}

export function setSelectedComponentId(id) {
  return { type: SET_SELECTED_COMPONENT_ID, id };
}

export function setSelectedComponentPosition(knobId, position) {
  return { type: SET_SELECTED_COMPONENT_POSITION, knobId, position };
}

export function setPedalDetails(pedalDetails) {
  return { type: SET_PEDAL_DETAILS, pedalDetails };
}

export function setPatchDetails(patchDetails) {
  return { type: SET_PATCH_DETAILS, patchDetails };
}

export function dragKnob() {
  return { type: DRAG_KNOB };
}

export function tapKnob() {
  return { type: TAP_KNOB };
}

export function setScale(scale) {
  return { type: SET_SCALE, scale };
}

export function setScaleBuilder(scale) {
  return { type: SET_SCALE_BUILDER, scale };
}

export function addKnob(knob) {
  return { type: ADD_KNOB, knob };
}

export function deleteKnob(selectedComponentId) {
  return { type: DELETE_KNOB, selectedComponentId };
}

export function updateCx(selectedComponentId, cx) {
  return { type: UPDATE_CX, selectedComponentId, cx };
}

export function updateCy(selectedComponentId, cy) {
  return { type: UPDATE_CY, selectedComponentId, cy };
}

export function startFromScratch() {
  return { type: START_FROM_SCRATCH };
}

export function setIsLoggedIn(isLoggedIn) {
  return { type: SET_IS_LOGGED_IN, isLoggedIn };
}

export function setCurrentPage(currentPage) {
  return { type: SET_CURRENT_PAGE, currentPage };
}
