import {GET_LANGUAGES} from "../actionTypes";
const INITIAL_STATE = "";

export default function languagesReducer(state=INITIAL_STATE, action) {
  switch(action.type) {
    case GET_LANGUAGES:
      return action.languages;
    default:
      return state;
  };
};