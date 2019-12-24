import { SET_CURRENT_PAGE, SET_USER_ID } from "../Actions/Actions";
import { sharedData } from "../Data";

function sharedState(state = sharedData, action) {
  switch (action.type) {
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.currentPage
      };
    case SET_USER_ID:
      return {
        ...state,
        userId: action.userId
      };
    default:
      return state;
  }
}

export default sharedState;
