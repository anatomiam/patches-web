import {
  SET_SCALE,
  SET_IS_LOGGED_IN,
  SET_CURRENT_PAGE
} from "../Actions/Actions";

import { sharedData } from "../Data";

function sharedState(state = sharedData, action) {
  switch (action.type) {
    case SET_CURRENT_PAGE:
      console.log(action);

      return {
        ...state,
        currentPage: action.currentPage
      };
    default:
      return state;
  }
}

export default sharedState;
