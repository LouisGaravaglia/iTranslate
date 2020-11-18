import {GET_RESULTS} from "../actionTypes";
const INITIAL_STATE = "";

export default function resultsReducer(state=INITIAL_STATE, action) {
  switch(action.type) {
    case GET_RESULTS:
      return action.results;
    default:
      return state;
  }
}


