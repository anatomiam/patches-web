import { combineReducers } from "redux";
import builderState from "./Builder";
import patcherState from "./Patcher";
import sharedState from "./Shared";

export default combineReducers({
  builderState,
  patcherState,
  sharedState,
});
