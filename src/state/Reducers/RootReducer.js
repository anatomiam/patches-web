import { combineReducers } from "redux";
import builderState from "./Builder";
import patcherState from "./Patcher";

export default combineReducers({
  builderState,
  patcherState
});
