import builderState from "./Builder";
import { combineReducers } from "redux";
import patcherState from "./Patcher";
import sharedState from "./Shared";

export default combineReducers({
  builderState,
  patcherState,
  sharedState,
});
