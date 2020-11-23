import {SET_IN_VIEW} from "../actionTypes";
const INITIAL_STATE = "";

export default function bgColorReducer(state=INITIAL_STATE, action) {
  switch(action.type) {
    case SET_IN_VIEW:
      return action.component;
    default:
      return state;
  }
}


