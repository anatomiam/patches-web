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
export const SET_ORIGINAL_KNOBS = "SET_ORIGINAL_KNOBS";
export const SET_SCALE_BUILDER = "SET_SCALE_BUILDER";
export const ADD_KNOB = "ADD_KNOB";
export const DELETE_KNOB = "DELETE_KNOB";
export const UPDATE_CX = "UPDATE_CX";
export const UPDATE_CY = "UPDATE_CY";
export const UPDATE_DESCRIPTION = "UPDATE_DESCRIPTION";
export const UPDATE_POSITION = "UPDATE_POSITION";
export const UPDATE_STEPS = "UPDATE_STEPS";
export const UPDATE_R = "UPDATE_R";
export const UPDATE_WIDTH = "UPDATE_WIDTH";
export const UPDATE_COLOR = "UPDATE_COLOR";
export const START_FROM_SCRATCH = "START_FROM_SCRATCH";
export const SET_IS_LOGGED_IN = "SET_IS_LOGGED_IN";
export const SET_USER_ID = "SET_USER_ID";

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

export function setOriginalKnobs() {
  return { type: SET_ORIGINAL_KNOBS };
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

export function updateDescription(selectedComponentId, description) {
  return { type: UPDATE_DESCRIPTION, selectedComponentId, description };
}

export function updatePosition(selectedComponentId, position) {
  return { type: UPDATE_POSITION, selectedComponentId, position };
}

export function updateSteps(selectedComponentId, steps) {
  return { type: UPDATE_STEPS, selectedComponentId, steps };
}

export function updateR(selectedComponentId, r) {
  return { type: UPDATE_R, selectedComponentId, r };
}

export function updateWidth(selectedComponentId, width) {
  return { type: UPDATE_WIDTH, selectedComponentId, width };
}

export function updateColor(selectedComponentId, color) {
  return { type: UPDATE_COLOR, selectedComponentId, color };
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

export function setUserId(userId) {
  return { type: SET_USER_ID, userId };
}
