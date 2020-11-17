import {GET_TRANSLATION} from "../actionTypes";
const INITIAL_STATE = "";

export default function translationReducer(state=INITIAL_STATE, action) {
  switch(action.type) {
    case GET_TRANSLATION:
      return action.translation;
    default:
      return state;
  }
}


