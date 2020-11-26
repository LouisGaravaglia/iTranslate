import {GET_RESULTS, RESET_SEARCH_RESULTS} from "../actionTypes";
const INITIAL_STATE = "";

export default function resultsReducer(state=INITIAL_STATE, action) {
  switch(action.type) {
    case GET_RESULTS:
      return action.results;
    case RESET_SEARCH_RESULTS:
      return "";
    default:
      return state;
  };
};